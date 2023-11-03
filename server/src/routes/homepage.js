const express = require('express')
const router = express.Router();
const homepage = require("../app/controller/homepageController");

router.get('/', homepage.home)

module.exports = router