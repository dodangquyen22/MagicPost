const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address_sent: {
        type: String,
        required: true
    },
    address_receive: {
        type: String,
        required: true
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

const User = mongoose.model('User', userSchema)
module.exports = User