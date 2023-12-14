const areaModule = require("../modulers/area");

class areaController {
    async getProvinceList(req, res, next) {
        res.json(await areaModule.aggregate([
            {$group: {_id: "$province", province: {$first: "$province"}}},
            {$sort: {"province": 1}}
        ]));
    }

    async getDistrictList(req, res, next) {
        if (!req.query.province) {
            console.log("Missing province");
        } else {
            const {province} = req.query;
            // res.json(await areaModule.distinct("district", {province: province}).exec());
            res.json(await areaModule.aggregate([
                {$match: {province: province}},
                {$group: {_id: "$district", district: {$first: "$district"}}},
                {$sort: {"district": 1}}
            ]));
        }
    }
}

module.exports = new areaController()