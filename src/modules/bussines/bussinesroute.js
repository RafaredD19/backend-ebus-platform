const express = require('express');
const router = express.Router();
const bussinesController = require('./bussinesController');

// const { isAuthenticated, isAdmin } = require('../../Middlewares/auth');

router.post('/create', bussinesController.createBussines);
router.get('/list', bussinesController.getAllBussines);
router.post('/create/massive', bussinesController.createBussinesBulk);


module.exports = router;
