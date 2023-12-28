const mongoose = require('mongoose')

const successDeliveryStatus = "success";
const failDeliveryStatus = "fail";
const shippingStatus = "shipping";

const packageSchema = new mongoose.Schema({
    ID: {
        type: "String"
    },
    // khu vực nhận hàng gửi
    receiveAreaID: {

    },
    // khu vực khách nhận hàng
    sendAreaID: {

    },
    //Thông tin người nhận
    receiverDetails:{

    },
    // Thông tin người gửi
    senderDetails: {

    },
    receiveDate: {
        type: Date  
    },
    cost: {
        type: Number
    },
    // thông tin gói hàng
    details: {
        type: String
    },
    status: {
        type: String
    },
})

const package = mongoose.model('package', packageSchema);

module.exports = package;
module.exports.successDeliveryStatus = successDeliveryStatus;
module.exports.failDeliveryStatus = failDeliveryStatus;
module.exports.shippingStatus = shippingStatus;