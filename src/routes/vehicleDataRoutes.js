// routes/vehicleDataRoutes.js
const express = require('express');
const router = express.Router();
const vehicleDataController = require('../controller/vehicleDataController');

router.post('/receive-and-filter', vehicleDataController.receiveAndFilterVehicleData);

module.exports = router;
