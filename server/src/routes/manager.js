const express = require('express');
const router = express.Router();
// const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');


//Hệ thống các điểm giao dịch và điểm tập kết
// router.get('/system/list',authenticateUser('manager'), warehouseController.getWarehouseList);

//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.get('/listAcount', authenticateUser('manager'), userController.getAccounts)
//Sửa thông tin của trưởng điểm tập kết và giao dịch [Viết sau]

//Cấp tài khoản cho nhân viên

//Thống kê[]

module.exports = router;