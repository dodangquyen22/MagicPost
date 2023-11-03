const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    idArea: {
        type: String,
        required: true
    }
})

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;