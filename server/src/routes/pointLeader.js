const express = require('express');
const router = express.Router();
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');
const { route } = require('./area');


//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.get('/listAcount', authenticateUser('transaction leader'), userController.getAccounts)
//Sửa thông tin của nhân viên của điểm tập kết [Viết sau]
router.post("/updateInfo", authenticateUser('transaction leader'),userController.updateInfo);
//Cấp tài khoản cho nhân viên
router.get("/resgister", authenticateUser('transaction leader'),userController.register)
//Thống kê hàng đi , hàng đến[]

module.exports = router;