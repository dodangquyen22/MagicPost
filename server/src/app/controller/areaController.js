const area = require("../modulers/area");
const User = require("../modulers/user");
const bcrypt = require("bcrypt");
const removeVietnameseTones = require("../../utils/convertVietNam");
const Point = require("../modulers/point");

class areaController {

    async getProvinceList(req, res, next) {
        res.json(await area.aggregate([
            {$group: {_id: "$province", province: {$first: "$province"}}},
            {$sort: {"province": 1}}
        ]));
    }

    async getDistrictList(req, res, next) {
        if (!req.query.province) {
            console.log("Missing province");
        } else {
            const {province} = req.query;
            // res.json(await area.distinct("district", {province: province}).exec());
            res.json(await area.aggregate([
                {$match: {province: province}},
                {$group: {_id: "$district", district: {$first: "$district"}}},
                {$sort: {"district": 1}}
            ]));
        }
    }

    async getPointTransaction(req, res, next) {
        try {
            const points = await Point.find({ type: "transaction" });
            const pointIds = points.map(point => point.idArea);
            const areas = await area.find({ transactionPointID: { $in: pointIds } });
            res.json({ areas, points });
        } catch (error) {
            next(error);
        }
    }

    async getPointWarehouse(req, res, next) {
        try {
            const points = await Point.find({ type: "transaction" });
            const pointIds = points.map(point => point.idArea);
            const areas = await area.find({ warehouseID: { $in: pointIds } });
    
            res.json({ areas, points });
        } catch (error) {
            next(error);
        }
    }


    async createTransaction(req, res, next) {
        const {province, district, address} = req.body;
        const id = removeVietnameseTones.removeVietnameseTones(district);
        const salt = await bcrypt.genSalt(10);
        const password = id;
        const username = id + "_point";
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ username });
        const role = "point leader";
        if (existingUser) {
            return res.status(400).json({ error: 'Điểm giao dịch này đã tồn tại' });
          }
        const user = new User({ username, password: hashedPassword,idArea: id, role });
        const areaa = new area({transactionPointID: id, province: province, district: district});
        const point = new Point({address: address, idArea: id, type: "transaction"});
        await user.save();
        await areaa.save();
        await point.save();
        res.status(200).json({message: 'Tạo điểm giao dịch thành công'})
    }


    async createWarehouse(req, res, next) {
        const {province, district, address} = req.body;
        const id = removeVietnameseTones.removeVietnameseTones(district);
        const salt = await bcrypt.genSalt(10);
        const password = id;
        const username = id + "_warehouse";
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ username });
        const role = "warehouse leader";
        if (existingUser) {
            return res.status(400).json({ error: 'Điểm giao dịch này đã tồn tại' });
          }
        const user = new User({ username, password: hashedPassword,idArea: id, role });
        const areaa = new area({warehouseID: id, province: province, district: district});
        const point = new Point({address: address, idArea: id, type: "warehouse"});
        await user.save();
        await areaa.save();
        await point.save();
        res.status(200).json({message: 'Tạo điểm tập kết thành công'})
    }


}

module.exports = new areaController()