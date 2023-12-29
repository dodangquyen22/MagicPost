const mongoose = require('mongoose')

const successDeliveryStatus = "success";
const failDeliveryStatus = "fail";
const shippingStatus = "shipping";
const pendingStatus = "pending";

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
        name: {
            type: String
        },
        province: {
            
        },
        district: {

        },
        address: {

        },
        phone: {
            
        }
    },
    // Thông tin người gửi
    senderDetails: {
        name: {
            type: String
        },
        province: {
            
        },
        district: {

        },
        address: {

        },
        phone: {
            
        }
    },
    receiveDate: {
        type: Date  
    },
    cost: {
        type: Number
    },
    currentPointID: {
        type: mongoose.Schema.Types.ObjectId
    },
    // thông tin gói hàng
    details: {
        code: {

        },
        type: {

        },
        name: {
            
        },
        quantity: {
            
        },
        weight: {
            
        },
        price: {
            
        },
        length: {
            
        },
        width: {
            
        },
        height: {
            
        },
        specialFeatures: []
    },
    status: {
        type: String,
    },
})

const package = mongoose.model('package', packageSchema);

module.exports = package;
module.exports.successDeliveryStatus = successDeliveryStatus;
module.exports.failDeliveryStatus = failDeliveryStatus;
module.exports.shippingStatus = shippingStatus;
module.exports.pendingStatus = pendingStatus;