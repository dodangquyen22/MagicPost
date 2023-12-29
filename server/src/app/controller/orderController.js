const order = require('../modulers/order');
const packageModule = require('../modulers/package');
const point = require('../modulers/point');
const area = require('../modulers/area');
const { ObjectId } = require('mongodb');
const { toWarehouseType, toCustomerType, toTransactionSpotType, toOtherAreaType } = require('../modulers/order');
const { successDeliveryStatus, failDeliveryStatus, shippingStatus, confirmedStatus } = require('../modulers/order');
const {pendingStatus} = require('../modulers/package');

var pointID;
class orderController {
    // Tạo đơn
    // Phải có type trong tạo đơn hàng
    createOrder = async (req, res, next) => {
        const {type} = req.query;
        console.log("query", req.query);
        if (type == toTransactionSpotType) {
            this.createOrderToTransactionSpot(req, res, next);
        } else if (type == toWarehouseType) {
            return this.createOrderToWarehouse(req, res, next);
        } else if (type == toCustomerType) {
            this.createOrderToCustomer(req, res, next);
        } else if (type == toOtherAreaType) {
            this.createOrderToOtherArea(req, res, next);
        }
    }

    //tao don den diem tap ket
    async createOrderToWarehouse(req, res, next) {
        try {
            const {packageID, type, pointID} = req.query;
            const idArea = (await point.findOne({_id: new ObjectId(pointID)}).exec()).idArea;
            const receivePointID = (await point.findOne({idArea: idArea, type: "warehouse"}).exec())._id;
            const newOrder = await new order({
                packageID: packageID,
                type: type,
                send_point_id: new ObjectId(pointID), //pointID,
                receive_point_id: receivePointID,
                sendDate: Date.now(),
                status: shippingStatus,
            })
            await newOrder.save();
            packageModule.updateOne({ID: packageID}, {$set: {status: shippingStatus}}).exec();
            console.log("Order created successfully");
        } catch (error) {
            console.log(error);
        }
    }
    // Tạo đơn đến điểm giao dịch
    async createOrderToTransactionSpot(req, res, next) {
        // Your code here
        try {
            const {packageID, type, pointID} = req.query;
            console.log(packageID);
            const pack = await packageModule.findOne({ID: packageID}).exec();
            if (pack == null) {
                console.log("Package not found");
                res.send('Package not found');
                return;
            }
            const rcvPoint = await point.findOne({idArea: pack.receiveAreaID, type: "transaction"}).exec();
            console.log("receive point: ", rcvPoint);
            const newOrder = await new order({
                packageID: packageID,
                type: type,
                receive_point_id: rcvPoint._id,
                send_point_id: new ObjectId(pointID), //pointID,
                sendDate: Date.now(),
                status: shippingStatus,
            })
            await newOrder.save();
            packageModule.updateOne({ID: packageID}, {$set: {status: shippingStatus}}).exec();
            console.log("Order created successfully");
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }
    async createOrderToCustomer(req, res, next) {
        try {
            const {type, pointID, packageID} = req.query;
            console.log(type, pointID, packageID);
            const newOrder = new order({
                packageID: packageID,
                type: type,
                receive_point_id: undefined,
                send_point_id: pointID,
                sendDate: new Date(),
                status: shippingStatus
            })
            await newOrder.save();
            packageModule.updateOne({ID: packageID}, {$set: {status: shippingStatus}}).exec();
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }

    async createOrderToOtherArea(req, res, next) {
        try {
            
            const {type, pointID, packageID} = req.query;
            const pack = await packageModule.findOne({ID: packageID}).exec();
            console.log("package: ", pack);
            const rcvPoint = await point.findOne({idArea: pack.receiveAreaID, type: "warehouse"}).exec();
            console.log("receive point: ", rcvPoint);

            const newOrder = new order({
                packageID: packageID,
                type: type,
                receive_point_id: rcvPoint._id,
                send_point_id: pointID,
                sendDate: new Date(),
                status: shippingStatus
            })
            await newOrder.save();
            packageModule.updateOne({ID: packageID}, {$set: {status: shippingStatus}}).exec();
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }
    // async getPendingOrder(req, res, next) {
    //     const pointID = req.query.pointID;
    //     var queries = {};
    //     if (pointID) {
    //         queries = {receive_point_id: pointID, status: shippingStatus};
    //     }
    //     res.json(await order.find(queries).exec());
    // }
    // Lấy danh sách đơn hàng
    async getOrderList(req, res, next) {
        try {
            const point_id = req.query.pointID;
            const type = req.query.type;
            console.log("point_id: ", point_id);
            var queries = {};
            if (type == "pending") {
                queries = {receive_point_id: new ObjectId(point_id), status: shippingStatus};
            } else {
                if (point_id) {
                    queries = {
                        $or : [
                            {receive_point_id: new ObjectId(point_id)},
                            {send_point_id: new ObjectId(point_id)}
                        ]
                    }
                }
            }
            console.log("queries: ", queries);
            res.json(await order.find(queries).exec());
        } catch (error) {
            res.send('Error when collecting order list');
            console.log(error);
        }
    }

    

    //xac nhan don hang
    async confirmOrder(req, res, next) {
        try {
            const orderID = req.query.orderID;
            const ord = await order.findOneAndUpdate({_id: new ObjectId(orderID)}, {$set : {status: confirmedStatus}}).exec();
            console.log("updated order: ", ord);
            if (ord.type == toCustomerType) {
                await packageModule.updateOne({ID: ord.packageID}, {$set: {currentPointID: undefined, status: successDeliveryStatus, receciveDate: Date.now()}}).exec();
            } else if (ord.type == toTransactionSpotType || ord.type == toWarehouseType || ord.type == toOtherAreaType) {
                await packageModule.updateOne({ID: ord.packageID}, {$set: {currentPointID: ord.receive_point_id, status: pendingStatus, receiveDate: Date.now()}}).exec();
            }
            res.json(ord);
        } catch (error) {
            // res.send('Error when confirming order');
            console.log(error);
        }
    }

    async statistics(req, res, next) {
        const spotID = req.query.spotID;
        console.log(req.query);
        var result = {};
        if (spotID) {
            // Số lượng hàng gửi đi khu vực khác
            result.totalSent = await order.find({receivePointID: spotID}).count().exec();
            // Số lượng hàng nhận từ khu vực khác
            result.totalSuccess = await order.find({sendPointID: spotID, status: successDeliveryStatus}).count().exec();
            result.totalFail = await order.find({sendPointID: spotID, status: failDeliveryStatus}).count().exec();
            var income = await order.aggregate([
                { $match: { receivePointID: spotID } },
                { $group: {
                    _id: null,
                    totalIncome: { $sum: "$cost" }
                }},
                { $project: { _id: 0 } }
            ]).exec();
            result.totalIncome = income.length > 0 ? income[0].totalIncome : 0;
            
        } else {
            result = (await order.aggregate([
                { $group: {
                    _id: null,
                    totalPackage : { $sum: 1 },
                    totalIncome: { $sum: "$cost" },
                    totalFail: { $sum: { $cond: [ { $eq: [ "$status", failDeliveryStatus ] }, 1, 0 ] } },
                    totalSuccess: { $sum: { $cond: [ { $eq: [ "$status", successDeliveryStatus ] }, 1, 0 ] } }
                }},
                { $project: { _id: 0 } }
            ]).exec())[0]   ;
        }
        res.json(result);
    }
}

module.exports = new orderController();