const User = require('../modulers/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const removeVietnameseTones = require("../../utils/convertVietNam");
const dotenv = require('dotenv').config();
const area = require("../modulers/area");
const Point = require("../modulers/point")

class userController{


    // [POST] tao tai khoan
    async register(req, res, next) {
        try{
            const {name, username, password, email, phone,province, district, role, gender} = req.body;
            const salt = await bcrypt.genSalt(10);
            console.log(salt)
            const hashedPassword = await bcrypt.hash(password, salt);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Người dùng đã tồn tại' });
              }
            const id = removeVietnameseTones.removeVietnameseTones(district)

            const user = new User({ name,username, password: hashedPassword, email, phone, province, district,idArea: id, role, gender });

            await user.save();
            res.status(200).json({message: 'Tạo tài khoản thành công'})
        }
       catch(error) {
            next(error)
       }   
    }
    async login(req, res, next) {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        console.log(accessTokenSecret)
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                // res.redirect('/');
                return;
            }
    
            const validPassword = await bcrypt.compare(req.body.password, user.password);
    
            if (validPassword) {
                var pointID;
                if (user.role == "transaction staff" || user.role == "transaction leader") {
                    pointID = ((await Point.findOne({ idArea: user.idArea, type: "transaction" }).exec())._id);
                } else if (user.role == "warehouse staff" || user.role == "warehouse leader") {
                    pointID = (await Point.findOne({ idArea: user.idArea, type: "warehouse" }).exec())._id;
                }

                const token = jwt.sign({ username: user.username, role: user.role, pointID: pointID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                // res.redirect('/');
                console.log(user.district)
                res.status(200).json({
                    message:"Đăng nhập thành công",
                    role: user.role,
                    pointID: pointID,
                    token: token,
                    idArea: user.idArea,
                    district: user.district,
                    province: user.province
                });
                return;
            }
            return res.status(400).json({error: 'Thông tin đăng nhập không đúng'})
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.clearCookie("uid");
        res.statusCode = 302;
        res.redirect('/');
        res.end();
    }
    //Xóa tài khoản
    async deleteAccount(req, res, next) {
        // Add your code here to delete the account
        const {_id} = req.params;
        console.log("req ",req.params);
        const deleteUser = await User.findOneAndDelete({_id: _id});
        res.status(200).json({message: "Xóa thành công"})
    }
    //Lấy danh sách tài khoản

    constructor() {
        this.getAccounts = this.getAccounts.bind(this);
        this.leaderGetAccounts = this.leaderGetAccounts.bind(this);
        this.warehouseLeaderGetAccounts = this.warehouseLeaderGetAccounts.bind(this);
        this.pointLeaderGetAccounts = this.pointLeaderGetAccounts.bind(this);
    }
    getAccounts(req, res, next) {
        //console.log(req.body.role)
        // Add your code here to get the account list
        if (req.body.role == "manager") {
            return this.leaderGetAccounts(req, res, next);
        }
        if(req.body.role == "warehouse leader") {
            return this.warehouseLeaderGetAccounts(req, res, next)
        }
        if(req.body.role == "transaction leader") {
            return this.pointLeaderGetAccounts(req, res, next);
        }
    }
    // Lấy danh sách tài khoản cho lãnh đạo
    async leaderGetAccounts(req, res, next) {
        try {
            const users = await User.find({ $or: [{ role: "warehouse leader" }, { role: "transaction leader" }] });
            //console.log(users)
            res.status(200).json(users); //res.json(users); 
        } catch (error) {
            next(error);
        }
    }
    // Lấy danh sách tài khoản cho trưởng điểm
    async warehouseLeaderGetAccounts(req, res, next) {
        const {idArea} = req.body;
        try {
            const users = await User.find({idArea: idArea,role: "warehouse staff"});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    // Lấy danh sách tài khoản cho trưởng điểm giao dịch
    async pointLeaderGetAccounts(req, res, next) {
        const {idArea} = req.body;
        try {
            const users = await User.find({idArea: idArea,role: "transaction staff"});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // Cập nhật thông tin
    async updateInfo(req, res, next) {
        try {
            const username = req.params.username;
            const updates = req.body;
            const user = await User.findByIdAndUpdate(username, updates, { new: true });
            res.status(200).json(user);
        } catch(error) {
            res.status(500).json({ error: "Lỗi khi cập nhật thông tin" });
        }
        
    }
}
module.exports = new userController()