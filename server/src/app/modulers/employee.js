const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pointId: {
        type: String,
        required: true
    }
})

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;