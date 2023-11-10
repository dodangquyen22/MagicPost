const mongoose = require('mongoose')

const point_leaderSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pointID: {
        
    }
})

const point_leader = mongoose.model('point_leader', point_leaderSchema);

module.exports = point_leader;