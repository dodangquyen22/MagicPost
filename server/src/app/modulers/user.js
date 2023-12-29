const mongoose = require('mongoose')

const managerString = "manager";
const warehouseLeaderString = "warehouse leader";
const warehouseStaffString = "warehouse staff";
const pointLeaderString = "transaction leader";
const pointStaffString = "transaction staff";
const customerString = "customer";
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
    city: {
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
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
module.exports.managerString = managerString;
module.exports.warehouseLeaderString = warehouseLeaderString;
module.exports.warehouseStaffString = warehouseStaffString;
module.exports.pointLeaderString = pointLeaderString;
module.exports.pointStaffString = pointStaffString;
module.exports.customerString = customerString;