const express = require('express');
const router = express.Router();
const userController = require("../app/controller/userController");
const orderController = require("../app/controller/orderController");
const packageController = require("../app/controller/packageController");
const { authenticateUser } = require('../middleware/authentication');
const { pointStaffString } = require('../app/modulers/user');

router.get('/package', authenticateUser(pointStaffString), packageController.getPackages);
router.post('/package/create', authenticateUser(pointStaffString), packageController.addPackage);

router.get('/order', authenticateUser(pointStaffString), orderController.getOrderList);

router.post('/order/create', authenticateUser(pointStaffString), orderController.createOrder);

router.get('/order/confirm', authenticateUser(pointStaffString), orderController.confirmOrder);

router.get('/order/statistics', authenticateUser(pointStaffString), orderController.statistics);

module.exports = router;