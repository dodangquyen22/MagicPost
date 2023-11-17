const express = require('express')
const router = express.Router();
// const homepage = require("../app/controller/homeController");
const user = require("../app/controller/userController")

router.post('/register', user.register)

module.exports = router