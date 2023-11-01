const mongoose = require('mongoose')

const point_leaderSchema = new mongoose.Schema({
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
        enum: ['transaction', 'collection'],
        require:true
    }
})

const point_leader = mongoose.model('point_leader', point_leaderSchema);

module.exports = point_leader;