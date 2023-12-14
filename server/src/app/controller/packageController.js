const packageModel = require('../modulers/package');
class packageController {
    // Thêm dữ liệu hàng gửi
    async addPackage(req, res, next) {
        try {
            const {packageID, receivePointID, sendPointID, receiverDetails, senderDetails, details, status} = req.body;
            const newPackage = new packageModel({
                ID: packageID,
                receivePointID: receivePointID,
                sendPointID: sendPointID,
                receiverDetails: receiverDetails,
                senderDetails: senderDetails,
                details: details,
                status: status
            })
            await newPackage.save();
            console.log("Package created successfully");
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
    statistics(req, res, next) {
        // Add your code here to perform the statistics
        // const spotID = req.params.spotID;
        // if (spotID) {
        //     queries = {
        //         $or: [
        //             {sendPointID: spotID},
        //             {receivePointID: spotID}
        //         ]
        //     }
        // }
        
    }
}

module.exports = new packageController();