const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name_sent: {
        type: String,
        require: true
    },
    name_receive: {
        type: String,
        require: true
    },
    phone_sent:{
        type: Number,
        require: true
    },
    phone_receive:{
        type: Number,
        require: true
    },
    code:{
        type: Number,
        require: true
    },
    address_sent: {
        type: String,
        required: true
    },
    address_receive: {
        type: String,
        required: true
    },
    time_sent: {
        type: Timestamp
    },
    point_transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'point_transaction'
    },
    point_gather:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'point_gather'
    },
    status: {
        type: String
    }
})

const order = mongoose.model('order', orderSchema)
module.exports = order