const mongoose = require('mongoose')
// Lưu thông tin các đơn vận chuyển 
const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    packageID: {

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'point'
    },
    send_point_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'point'
    },
    sendDate: {

    },
    receiveDate: {

    },
    status: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User