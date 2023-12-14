const express = require("express");
const router = express.Router();
const orderController = require("../app/controller/orderController");

router.post('/', orderController.getOrderList);

router.post('/create', orderController.createOrder);

router.get('/confirm/:orderID', orderController.confirmOrder);

module.exports = router