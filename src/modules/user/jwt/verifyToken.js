// src/modules/user/jwt/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'ohhhMeVengooooo');
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, message: error.message };
  }
};

module.exports = verifyToken;
