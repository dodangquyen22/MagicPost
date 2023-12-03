const { Timestamp, Int32 } = require('mongodb')
const mongoose = require('mongoose')

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
        enum: ['customer', 'spot'] // To customer or to another spot
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