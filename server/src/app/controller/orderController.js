const order = require('../modulers/order');
const packageM = require('../modulers/package');
const { ObjectId } = require('mongodb');

const confirmedStatusString = "confirmed";
const onDeliveryStatusStr = "on delivery";
const deliveredStatusStr = "delivered";

const typeMap = {
    packageID: 'string',
    type: 'string',
    address_send : 'string',
    address_receive : 'string',
    status: 'string',
    receive_point_id: 'number', // specify the type for each parameter
    send_point_id: 'number',
    sendDate: 'date',
    receiveDate: 'date',
    status: 'string',
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
            const {packageID, type, address_send, address_receive, status, receive_point_id, send_point_id, sendDate, receiveDate} = req.body;
            const newOrder = await new order({
                id: Math.floor(Math.random() * 100000),
                packageID: packageID,
                type: type,
                address_send: address_send,
                address_receive: address_receive,
                status: status,
                receive_point_id: receive_point_id,
                send_point_id: send_point_id,
                sendDate: sendDate,
                receiveDate: receiveDate
            })
            await newOrder.save();
            console.log("Order created successfully");
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }
    createOrderToCustomer(req, res, next) {
        
    }
    // Lấy danh sách đơn hàng
    async getOrderList(req, res, next) {
        try {
            const {point_id} = req.body;
            var queries = {};
            if (point_id) {
                queries = {
                    $or: [{receive_point_id: Number(point_id)}, {send_point_id: Number(point_id)}],
                };
            }
            res.json(await order.find(queries).exec());
        } catch (error) {
            res.send('Error when collecting order list');
            console.log(error);
        }
    }

    //xac nhan don hang
    async confirmOrder(req, res, next) {
        try {
            const {orderID} = req.body;
            await order.updateOne({id: orderID}, {status: confirmedStatusString});
        } catch (error) {
            console.log('Confirm failed', error);
        }
    }
}

module.exports = new orderController();