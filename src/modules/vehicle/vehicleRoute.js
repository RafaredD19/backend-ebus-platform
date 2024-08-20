const express = require('express');
const router = express.Router();
const vehicleController = require('./vehicleController');

router.get('/list', vehicleController.getAllVehicles);
router.post('/create', vehicleController.createVehicle);
router.post('/create/massive', vehicleController.createVehiclesBulk);


module.exports = router;
