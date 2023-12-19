const mongoose = require('mongoose')

const successDeliveryStatus = "success";
const failDeliveryStatus = "fail";

const packageSchema = new mongoose.Schema({
    ID: {
        type: "String"
    },
    // điểm giao dịch nhận hàng gửi
    receivePointID: {

    },
    // điểm giao dịch cuối gửi hàng cho khách
    sendPointID: {

    },
    //Thông tin người nhận
    receiverDetails:{

    },
    // Thông tin người gửi
    senderDetails: {

    },
    cost: {

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