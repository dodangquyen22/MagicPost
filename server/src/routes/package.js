const express = require('express');
const router = express.Router();
const packageController = require("../app/controller/packageController");

router.post('/', packageController.getPackages);

router.post('/create', packageController.addPackage);

router.post('/update', packageController.updatePackage);

router.post('/remove', packageController.removePackage);

// ?spotID để thống kê theo điểm 
// totalSent: Số hàng gửi khu vực khác
// totalSuccess: Số lần gửi đến khách hàng trong khu vực thành công
// totalFail: Số lần gửi đến khách hàng trong khu vực không thành công
// totalIncome: Tổng số tiền thu
router.get('/statistic', packageController.statistics);

module.exports = router;