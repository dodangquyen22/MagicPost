const order = require("../modulers/order");

class transactionController{
    //Tao don hang cho khach hang
    async createOrder(req, res, next) {
        try {
        const {name_sent,name_receive,phone_sent,phone_receive, address_sent, address_receive, code, time_sent} = req.body;
        const order = await new order({
            name_sent: name_sent,
            name_receive: name_receive,
            phone_sent: phone_sent,
            phone_receive: phone_receive,
            address_receive: address_receive,
            address_sent: address_sent,
            code: code,
            time_sent: time_sent
        })
        await order.save();
    } catch (error) {
        next(error)
    }
    }
    //tao don den diem tap ket
    createDeliveryRequest(req, res,next) {
        
    }
    //xac nhan don hang ve tu diem tap ket
    confirmDeliveryGather(req, res, next) {

    }
    //xac nhan don hang da chuyen den nguoi nhan
    confirm(req, res, nexe){

    }
    //thong ke
    statistic(req, res, next) {
        
    }
}