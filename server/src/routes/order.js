const express = require("express");
const router = express.Router();
const orderController = require("../app/controller/orderController");

router.get('/', orderController.getOrderList);

router.get('/create', orderController.createOrder);

router.get('/confirm/:orderID', orderController.confirmOrder);

module.exports = router