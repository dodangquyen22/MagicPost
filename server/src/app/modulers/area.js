const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    id: {
    },
    name: {
        type: String,
    },  
    transactionPointID: {
        type: String,
    },
    warehouseID: {
        type: String,
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