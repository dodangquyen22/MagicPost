const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        "manager" : 0,
        "point leader" : 1,
        "employee transaction" : 2,
        "custumer" : 3
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User