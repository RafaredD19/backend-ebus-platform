const express = require('express');
const router = express.Router();
const cameraController = require('./cameraController');

router.post('/listDate', cameraController.getCamerasByDateRange);
router.post('/create', cameraController.createCameraCount);
router.post('/create/massive', cameraController.createCameraCountsBulk);


module.exports = router;
