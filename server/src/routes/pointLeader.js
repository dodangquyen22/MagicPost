const express = require('express');
const router = express.Router();
const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');


//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.get('/listAcount', authenticateUser('point leader'), userController.getAccounts)
//Sửa thông tin của nhân viên của điểm tập kết [Viết sau]

//Cấp tài khoản cho nhân viên
router.get("/resgister", authenticateUser('point leader'),userController.register)
//Thống kê hàng đi , hàng đến[]

module.exports = router;