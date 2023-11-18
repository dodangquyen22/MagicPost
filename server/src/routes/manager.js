const express = require('express');
const router = express.Router();
const warehouseController = require('../app/controller/warehouseController');
const { authenticateUser } = require('../middleware/authentication');
const checkRole  = require('../middleware/authorization');


router.get('/system/list',authenticateUser, checkRole("manager"), warehouseController.getWarehouseList);
// router.post('/register', userController.register);
// router.post('/admin', userController.login);

module.exports = router;