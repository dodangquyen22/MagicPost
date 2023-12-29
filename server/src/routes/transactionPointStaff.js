const express = require('express');
const router = express.Router();
const userController = require("../app/controller/userController");
const orderController = require("../app/controller/orderController");
const packageController = require("../app/controller/packageController");
const { authenticateUser } = require('../middleware/authentication');
const { pointStaffString } = require('../app/modulers/user');

router.get('/package',  packageController.getPackages);
router.post('/package/create', packageController.addPackage);

router.get('/order',  orderController.getOrderList);

router.get('/order/create', orderController.createOrder);

router.get('/order/confirm', orderController.confirmOrder);

router.get('/order/statistics', authenticateUser(pointStaffString), orderController.statistics);

module.exports = router;