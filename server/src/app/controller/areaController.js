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
        
            const resultPromises = points.map(async (point) => {
              const areas = await area.findOne({ 
                transactionPointID: point.idArea });
              return {
                point: point,
                area: areas,
              };
            });
        
            const result = await Promise.all(resultPromises);
        
            res.json({ points: result });
            // console.log(result);
          } catch (error) {
            next(error);
          }
    }

    async getPointWarehouse(req, res, next) {
        try {
          const points = await Point.find({ type: "warehouse" });
      
          const resultPromises = points.map(async (point) => {
            const areas = await area.findOne({ warehouseID: point.idArea });
            return {
              point: point,
              area: areas,
            };
          });
      
          const result = await Promise.all(resultPromises);
      
          res.json({ points: result });
        //   console.log(result);
        } catch (error) {
          next(error);
        }
      }


    async createTransaction(req, res, next) {
        // console.log(req.body);
        const {province, district, address, name, gender} = req.body;
        const id = removeVietnameseTones.removeVietnameseTones(district);
        const salt = await bcrypt.genSalt(10);
        const password = id;
        const username = id + "_point";
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ username });
        const role = "transaction leader";
        if (existingUser) {
            return res.status(400).json({ error: 'Điểm giao dịch này đã tồn tại' });
          }
        const user = new User({ username, password: hashedPassword,idArea: id, role,name, gender,province: province, district: district});
        const areaa = new area({transactionPointID: id, province: province, district: district});
        const point = new Point({address: address, idArea: id, type: "transaction"});
        await user.save();
        await areaa.save();
        await point.save();
        res.status(200).json({message: 'Tạo điểm giao dịch thành công'})
    }


    async createWarehouse(req, res, next) {
        const {province, district, address, name, gender} = req.body;
        const id = removeVietnameseTones.removeVietnameseTones(district);
        const salt = await bcrypt.genSalt(10);
        const password = id;
        const username = id + "_warehouse";
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ username });
        const role = "warehouse leader";
        if (existingUser) {
            console.log("lỗi");
            return res.status(400).json({ error: 'Điểm giao dịch này đã tồn tại' });
          }
        const user = new User({ username, password: hashedPassword,idArea: id, role,name, gender, province: province, district: district});
        const areaa = new area({warehouseID: id, province: province, district: district});
        const point = new Point({address: address, idArea: id, type: "warehouse"});
        await user.save();
        await areaa.save();
        await point.save();
        res.status(200).json({message: 'Tạo điểm tập kết thành công'})
    }


    async deleteWarehouse(req, res, next) {
        const { warehouseID } = req.params; // Assuming warehouseID is part of the request parameters
      
        try {
          // Delete User
          await User.findOneAndDelete({ idArea: warehouseID, role: "warehouse leader" });
      
          // Delete area
          await area.findOneAndDelete({ warehouseID });
      
          // Delete Point
          await Point.findOneAndDelete({ idArea: warehouseID, type: "warehouse" });
      
          res.status(200).json({ message: 'Xóa điểm tập kết thành công' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }


      async deleteTransaction(req, res, next) {
        const {  transactionPointID } = req.params; // Assuming warehouseID is part of the request parameters
      
        try {
          // Delete User
          await User.findOneAndDelete({ idArea: transactionPointID, role: "transaction leader" });
      
          // Delete area
          await area.findOneAndDelete({ transactionPointID });
      
          // Delete Point
          await Point.findOneAndDelete({ idArea: transactionPointID, type: "transaction" });
      
          res.status(200).json({ message: 'Xóa điểm giao dịch thành công' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

}

module.exports = new areaController()