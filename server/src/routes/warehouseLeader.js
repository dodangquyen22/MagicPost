const express = require('express');
const router = express.Router();
// const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController");
const { authenticateUser } = require('../middleware/authentication');


//Hệ thống các điểm giao dịch và điểm tập kết

//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.post('/listAcount', authenticateUser('warehouse leader'), userController.getAccounts)
//Sửa thông tin của nhân viên của điểm tập kết [Viết sau]
router.post("/updateInfo", authenticateUser('warehouse leader'),userController.updateInfo)
//Cấp tài khoản cho nhân viên
router.post("/resgister", authenticateUser('warehouse leader'),userController.register)
//Xóa tài khoản nhân viên
router.delete("/delete/:_id", authenticateUser('warehouse leader'),userController.deleteAccount)
//Thống kê hàng đi , hàng đến[]

module.exports = router;