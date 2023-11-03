const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    idArea: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['transaction', 'gather']
    }
})

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;