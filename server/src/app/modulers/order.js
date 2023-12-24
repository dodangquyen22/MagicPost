const { Timestamp, Int32 } = require('mongodb')
const mongoose = require('mongoose')

const successDeliveryStatus = "success";
const failDeliveryStatus = "fail";
const shippingStatus = "shipping";
const confirmedStatus = "confirmed";

const toWarehouseType = "to warehouse";
const toCustomerType = "to customer";
const toTransactionSpotType = "to transaction spot";
const toOtherAreaType = "to other area";

// Lưu thông tin các đơn vận chuyển 
const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    packageID: {
        type: String,
        // ref: 'package',
        required: true
    },
    type: {
        type: String,
        enum: [toWarehouseType, toCustomerType, toTransactionSpotType, toOtherAreaType] // To customer or to another spot
        // required: true
    },
    address_send: {
        type: String,
    },
    address_receive: {
        type: String,
    },
    receive_point_id: {
    },
    send_point_id:{
    },
    sendDate: {
                type: Date,
        // required: true
    },
    receiveDate: {
        type: Date,
        // required: true
    },
    status: {
        type: String,
        // required: true
    }
})

const order = mongoose.model('order', orderSchema);
module.exports = order
module.exports.successDeliveryStatus = successDeliveryStatus;
module.exports.failDeliveryStatus = failDeliveryStatus;
module.exports.shippingStatus = shippingStatus;
module.exports.confirmedStatus = confirmedStatus;
module.exports.toWarehouseType = toWarehouseType;
module.exports.toCustomerType = toCustomerType;
module.exports.toTransactionSpotType = toTransactionSpotType;
module.exports.toOtherAreaType = toOtherAreaType;