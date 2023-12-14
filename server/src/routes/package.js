const express = require('express');
const router = express.Router();
const packageController = require("../app/controller/packageController");

router.post('/', packageController.getPackages);

router.post('/create', packageController.addPackage);

router.post('/update', packageController.updatePackage);

router.post('/remove', packageController.removePackage);

module.exports = router;