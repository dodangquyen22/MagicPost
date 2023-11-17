const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
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
    // thông tin gói hàng
    details: {
        type: String
    },
    status: {
        type: String
    }
})

const package = mongoose.model('package', packageSchema);

module.exports = package;