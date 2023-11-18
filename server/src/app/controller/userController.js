const User = require('../modulers/user')
const bcrypt = require("bcrypt")

class userController{
    home(req, res, next) {
        res.send('sdsadsada');
    }
    async register(req, res, next) {
        try{
            const { username, password, email, phone, address, role } = req.body;
            // console.log(username)
            // console.log(password)
            // console.log(req.body)
            const salt = await bcrypt.genSalt(10);
            console.log(salt)
            const hashedPassword = await bcrypt.hash(password, salt);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Người dùng đã tồn tại' });
              }
          
            const user = new User({ username, password: hashedPassword, email, phone, address, role });
            await user.save();
        }
       catch(error) {
            next(error)
       }   
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
    
            if (!user) {
                res.redirect('/');
                return;
            }
    
            const validPassword = await bcrypt.compare(req.body.password, user.password);
    
            if (validPassword) {
                res.cookie("uid", user.id);
                console.log(user.id)
                res.redirect('/');
                return;
            }
    
            res.redirect('/');
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
}
module.exports = new userController()