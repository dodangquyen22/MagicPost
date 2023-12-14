const express = require('express');
const router = express.Router();
const areaController = require('../app/controller/areaController');

router.get('/province', areaController.getProvinceList);

router.get("/district", areaController.getDistrictList);

module.exports = router