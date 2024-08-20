const express = require('express');
const router = express.Router();
const masterController = require('./masterController');

router.post('/create', masterController.createMaster);

module.exports = router;
