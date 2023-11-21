const order = require('../modulers/order');
const packageM = require('../modulers/package');
const { ObjectId } = require('mongodb');

const confirmedStatusString = "confirmed";
const onDeliveryStatusStr = "on delivery";
const deliveredStatusStr = "delivered";

const typeMap = {
    receive_point_id: 'number', // specify the type for each parameter
    status: 'string',
    send_point_id: 'number'
    // add more parameters as needed
  };
class orderController {
    // Tạo đơn
    createOrder = async (req, res, next) => {
        if (true) {
            await this.createOrderToTransactionSpot(req, res, next);
        } else if (false) {
            return this.createOrderToWarehouse(req, res, next);
        } else {
            this.createOrderToCustomer(req, res, next);
        }
    }

    //tao don den diem tap ket
    createOrderToWarehouse(req, res, next) {

    }
    // Tạo đơn đến điểm giao dịch
    async createOrderToTransactionSpot(req, res, next) {
        // Your code here
        try {
            var properties = {};
            for (var key in req.query) {
                if (typeMap[key] === 'number') {
                    properties[key] = Number(req.query[key]);
                } else if (typemap[key] === 'string') {
                    properties[key] = req.query[key];
                } else {
                    res.send("Invalid properties");
                }
            }
            const newID = new ObjectId();
            console.log("created ID: ", newID);
            
            properties["id"] = newID;
            await order.insertMany(properties);
            res.send("Order created successfully");
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }
    createOrderToCustomer(req, res, next) {
        
    }
    // Lấy danh sách đơn hàng
    async getOrderList(req, res, next) {
        try {
            var queries = {};
            for (var key in req.query) {
                if (typeMap[key] === 'number') {
                    queries[key] = Number(req.query[key]);
                } else {
                    queries[key] = req.query[key];
                }
            }
            var orders = order.find(queries);
            res.send(await orders.exec());
        } catch (error) {
            res.send('lỗi rùi');
            console.log(error);
        }
    }

    //xac nhan don hang
    async confirmOrder(req, res, next) {
        try {
            await order.updateOne({id: req.params.orderID}, {status: confirmedStatusString});
        } catch (error) {
            console.log('Update failed', error);
        }
    }
}

module.exports = new orderController();