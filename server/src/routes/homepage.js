const express = require('express');
const router = express.Router();
const userController = require('../app/controller/userController');
const { authenticateUser, checkRole } = require('../middleware/authentication');


router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;