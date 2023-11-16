const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    transactionPointID: {

    },
    warehouseID: {

    }
})

const area = mongoose.model('area', areaSchema);

module.exports = area;