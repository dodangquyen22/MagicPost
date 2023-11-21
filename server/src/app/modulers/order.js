const { Timestamp, Int32 } = require('mongodb')
const mongoose = require('mongoose')

// Lưu thông tin các đơn vận chuyển 
const orderSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    packageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    },
    type: {
        type: String,
        enum: ['to customer', 'not to customer']
    },
    address_sent: {
        type: String,
        required: true
    },
    address_receive: {
        type: String,
        required: true
    },
    receive_point_id: {
    },
    send_point_id:{
    },
    sendDate: {

    },
    receiveDate: {

    },
    status: {
        type: String
    }
})

const order = mongoose.model('order', orderSchema);
module.exports = order