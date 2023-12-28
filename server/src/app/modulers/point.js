const mongoose = require('mongoose')
const warehouseTypeString = "warehouse";
const transactionTypeString = "transaction";
// Lưu thông tin cả điểm tập kết và điểm giao dịch
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
        enum: [warehouseTypeString, transactionTypeString],
    }
})

const Point = mongoose.model('point', point_Schema);

module.exports = Point;
module.exports.warehouseTypeString = warehouseTypeString;
module.exports.transactionTypeString = transactionTypeString;