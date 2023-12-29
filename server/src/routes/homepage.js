const express = require('express');
const router = express.Router();
const userController = require('../app/controller/userController');
const { authenticateUser, checkRole } = require('../middleware/authentication');



router.post('/register', userController.register);
router.post('/login', userController.login);
// router.get('/employee', authenticateUser('manager'), userController.getEmployees);

module.exports = router;