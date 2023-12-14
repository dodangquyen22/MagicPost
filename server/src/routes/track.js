const express = require('express');
const router = express.Router();
const trackingController = require("../app/controller/trackingController");

router.post('/', trackingController.trackPackage);

module.exports = router;