const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    // điểm nhận hàng gửi
    receivePointID: {

    },
    // điểm cuối gửi hàng cho khách
    sendPointID: {

    },
    receiverDetails:{

    },
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