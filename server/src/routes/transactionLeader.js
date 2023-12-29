const express = require('express');
const router = express.Router();
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');
const { route } = require('./area');

router.post('/listAcount', authenticateUser('transaction leader'), userController.getAccounts)
//Cấp tài khoản cho nhân viên
router.post("/resgister", authenticateUser('transaction leader'),userController.register)
//Xóa tài khoản nhân viên
router.delete("/delete/:_id", authenticateUser('transaction leader'),userController.deleteAccount)
//Thống kê hàng đi , hàng đến[]

module.exports = router;