const express = require('express');
const router = express.Router();
// const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');
const areaController = require('../app/controller/areaController');
const statisticController = require('../app/controller/statisticController');


//Hệ thống các điểm giao dịch và điểm tập kết
// router.get('/system/list',authenticateUser('manager'), warehouseController.getWarehouseList);
router.get('/province', areaController.getProvinceList);

router.get("/district", areaController.getDistrictList);


router.get("/pointTransaction",authenticateUser('manager'), areaController.getPointTransaction);
router.get("/pointWarehouse",authenticateUser('manager'), areaController.getPointWarehouse);
router.post("/createTransaction",authenticateUser('manager'), areaController.createTransaction);
router.post("/createWarehouse", authenticateUser('manager'),areaController.createWarehouse);
router.delete("/deleteWarehouse/:warehouseID", authenticateUser("manager"),areaController.deleteWarehouse);
router.delete("/deleteTransaction/:transactionPointID", authenticateUser("manager"),areaController.deleteTransaction);


//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.post('/listAcount', authenticateUser('manager'), userController.getAccounts);
//Sửa thông tin của trưởng điểm tập kết và giao dịch [Viết sau]
router.post("/updateInfo", authenticateUser('manager'),userController.updateInfo);

//Thống kê[]
router.get("/statistic",authenticateUser("manager"), statisticController.getLeaderStatistic);
router.get("/statistic/warehouse/:idArea",authenticateUser("manager"), statisticController.getLeaderWarehouseStatistic);
router.post("/statistic/transaction/:idArea",authenticateUser("manager"), statisticController.getLeaderTransactionStatistic);

module.exports = router;