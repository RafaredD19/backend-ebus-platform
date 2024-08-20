const express = require('express');
const router = express.Router();
const masterController = require('./masterController');
const { jwtSuperMasterMiddleware } = require('../user/jwt/jwtMiddleware');
router.post('/create',jwtSuperMasterMiddleware,  masterController.createMaster);
router.get('/list', jwtSuperMasterMiddleware, masterController.getAllMasters);

module.exports = router;
