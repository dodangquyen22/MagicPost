const orderModel = require('../modulers/order');

class trackingController {
    // Theo dõi đơn hàng
    async trackPackage(req, res, next) {
        try {
            const {packageID} = req.body;
            console.log(packageID);
            var query = orderModel.find({packageID: packageID}).sort({sendDate: 1});
            var orders = await query.exec();
            res.json(orders);
        } catch (error) {
            console.log('Tracking error: ', error);
        }
    }
}

module.exports = new trackingController();