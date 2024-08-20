const express = require('express');
const router = express.Router();
const companiesController = require('./companiesController');
const { jwtMasterMiddleware } = require('../user/jwt/jwtMiddleware');  // Protege la ruta para que solo los MASTER puedan acceder

router.post('/create', jwtMasterMiddleware, companiesController.createCompany);

module.exports = router;
