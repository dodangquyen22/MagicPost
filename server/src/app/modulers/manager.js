const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;