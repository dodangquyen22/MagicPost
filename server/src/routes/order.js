const express = require("express");
const router = express.Router();
const orderController = require("../app/controller/orderController");

router.get('/', orderController.getOrderList);

router.post('/create', orderController.createOrder);

router.get('/confirm/:orderID', orderController.confirmOrder);

router.get('/statistics', orderController.statistics);

module.exports = router