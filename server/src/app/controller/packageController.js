const packageModel = require('../modulers/package');
const area = require('../modulers/area');
const { warehouseTypeString, transactionTypeString } = require('../modulers/package');
const {successDeliveryStatus, failDeliveryStatus, shippingStatus, confirmedStatus} = require("../modulers/package");
class packageController {
    // Thêm dữ liệu hàng gửi
    async addPackage(req, res, next) {
        try {
            console.log("Body: ", req.body);
            const {sender, recipient, details} = req.body;
            const sendArea = await area.findOne({province: sender.province, district: sender.district});
            const recipientArea = await area.findOne({province: recipient.province, district: recipient.district});
            console.log(sendArea, recipientArea);
            const senderDetails = "Name: " + sender.name + ", Phone: " + sender.phone + ", Address: " + sender.address;
            const receiverDetails = "Name: " + recipient.name + ", Phone: " + recipient.phone + ", Address: " + recipient.address;
            const newPackage = new packageModel({
                ID: Math.floor(Math.random() * 1000000000),
                receiveAreaID: recipientArea.id,
                sendAreaID: sendArea.id,
                receiverDetails: receiverDetails,
                senderDetails: senderDetails,
                details: details,
                status: shippingStatus
            })
            await newPackage.save();
            console.log("Package created successfully");
            res.json(newPackage);
        } catch (error) {
            console.log("Package creation failed: ", error);
        }
    }

    // Xóa dữ liệu hàng gửi
    async removePackage(req, res, next) {
        const {packageID} = req.body;
        packageModel.deleteOne({ID: packageID}).exec();
        // packageModel.deleteMany({}).exec();
        console.log("Package deleted successfully");
    }

    // Lấy dữ liệu hàng gửi
    async getPackages(req, res, next) {
        // Your code here
        const {spotID} = req.body;
        var queries = {};
        if (spotID) {
            queries = {
                $or: [
                    {sendPointID: spotID},
                    {receivePointID: spotID}
                ]
            }
        }
        const packages = await packageModel.find(queries).exec();
        res.json(packages);
    }

    // Cập nhật dữ liệu hàng gửi
    async updatePackage(req, res, next) {
        // Your code here
        try {
            const {packageID, receivePointID, sendPointID, receiverDetails, senderDetails, details, status} = req.body;
            packageModel.updateOne({ID: packageID}, {
                receivePointID: receivePointID,
                sendPointID: sendPointID,
                receiverDetails: receiverDetails,
                senderDetails: senderDetails,
                details: details,
                status: status
            }).exec();
            console.log("Package updated successfully");
        } catch (error) {
            console.log("Package update failed: ", error);
        }
    }

    // Thống kê hàng 
    async statistics(req, res, next) {
        // Add your code here to perform the statistics
        const spotID = req.query.spotID;
        console.log(req.query);
        var result = {};
        if (spotID) {
            // Số lượng hàng gửi đi khu vực khác
            result.totalSent = await packageModel.find({receivePointID: spotID}).count().exec();
            // Số lượng hàng nhận từ khu vực khác
            result.totalSuccess = await packageModel.find({sendPointID: spotID, status: successDeliveryStatus}).count().exec();
            result.totalFail = await packageModel.find({sendPointID: spotID, status: failDeliveryStatus}).count().exec();
            var income = await packageModel.aggregate([
                { $match: { receivePointID: spotID } },
                { $group: {
                    _id: null,
                    totalIncome: { $sum: "$cost" }
                }},
                { $project: { _id: 0 } }
            ]).exec();
            result.totalIncome = income.length > 0 ? income[0].totalIncome : 0;
            
        } else {
            result = (await packageModel.aggregate([
                { $group: {
                    _id: null,
                    totalPackage : { $sum: 1 },
                    totalIncome: { $sum: "$cost" },
                    totalFail: { $sum: { $cond: [ { $eq: [ "$status", failDeliveryStatus ] }, 1, 0 ] } },
                    totalSuccess: { $sum: { $cond: [ { $eq: [ "$status", successDeliveryStatus ] }, 1, 0 ] } }
                }},
                { $project: { _id: 0 } }
            ]).exec())[0];
        }
        res.json(result);
    }   
}

module.exports = new packageController();