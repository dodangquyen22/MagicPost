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
    district: {
        type: String,
        require: true
    },
    province :{
        type: String,
        require: true
    },
    idArea: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["manager", "warehouse leader", "warehouse staff", "transaction leader", "transaction staff", "customer"],
        required: true
    },
    gender: {
        type: String,
        require: true
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User