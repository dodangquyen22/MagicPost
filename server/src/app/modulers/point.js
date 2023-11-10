const mongoose = require('mongoose')

const point_Schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    address: {
        type: String,
        require: true
    },
    idArea: {
        type: String,
        required: true
    },
    pointLeaderID: {

    },
    type: {
        type: String,
        enum: ['transaction', 'warehouse'],
    }
})

const point_gather = mongoose.model('point', point_Schema);

module.exports = point;