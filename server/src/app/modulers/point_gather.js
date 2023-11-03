const mongoose = require('mongoose')

const point_gatherSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    idArea: {
        type: String,
        required: true
    }
})

const point_gather = mongoose.model('point_gather', point_gatherSchema);

module.exports = point_gather;