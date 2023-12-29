const express = require('express');
const router = express.Router();
// const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');
const areaController = require('../app/controller/areaController');
const statisticController = require('../app/controller/statisticController');
const { route } = require('./area');


//Hệ thống các điểm giao dịch và điểm tập kết
// router.get('/system/list',authenticateUser('manager'), warehouseController.getWarehouseList);
router.get('/province', areaController.getProvinceList);

router.get("/district", areaController.getDistrictList);

//lấy thông tin các điểm gaio dịch
router.get("/pointTransaction",authenticateUser('manager'), areaController.getPointTransaction);
//lấy thông tin các điểm tập kết
router.get("/pointWarehouse",authenticateUser('manager'), areaController.getPointWarehouse);
//tạo điểm giao dịch
router.post("/createTransaction",authenticateUser('manager'), areaController.createTransaction);
//tạo điểm tập kết
router.post("/createWarehouse", authenticateUser('manager'),areaController.createWarehouse);
//xóa điểm tập kết
router.delete("/deleteWarehouse/:warehouseID", authenticateUser("manager"),areaController.deleteWarehouse);
//xóa điểm giao dịch
router.delete("/deleteTransaction/:transactionPointID", authenticateUser("manager"),areaController.deleteTransaction);


//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.post('/listAcount', authenticateUser('manager'), userController.getAccounts);
//Sửa thông tin của trưởng điểm tập kết và giao dịch [Viết sau]
router.post("/updateInfo", authenticateUser('manager'),userController.updateInfo);

//Thống kê cả nước
router.get("/statistic",authenticateUser("manager"), statisticController.getLeaderStatistic);
//Thống kê ở điểm tập kết
router.get("/statistic/warehouse/:idArea",authenticateUser("manager"), statisticController.getLeaderWarehouseStatistic);
//Thống kê ở điểm giao dịch
router.post("/statistic/transaction/:idArea", statisticController.getLeaderTransactionStatistic);

module.exports = router;