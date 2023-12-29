const express = require('express');
const router = express.Router();
const userController = require("../app/controller/userController");
const orderController = require("../app/controller/orderController");
const packageController = require("../app/controller/packageController");
const { authenticateUser } = require('../middleware/authentication');
const { warehouseStaffString } = require('../app/modulers/user');

router.get('/order', orderController.getOrderList);

router.post('/order/create', authenticateUser(warehouseStaffString), orderController.createOrder);

router.get('/order/confirm', authenticateUser(warehouseStaffString), orderController.confirmOrder);

router.get('/order/statistics', authenticateUser(warehouseStaffString), orderController.statistics);

module.exports = router;