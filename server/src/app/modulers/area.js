const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
    },
    transactionPointID: {

    },
    warehouseID: {

    },
    province: {
        type: String
    },
    district: {
        type: String
    }
})

const area = mongoose.model('area', areaSchema);

module.exports = area;