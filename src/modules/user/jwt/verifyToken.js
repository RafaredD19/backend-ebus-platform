const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');  // Asegúrate de que 'your_secret_key' sea la misma usada en generateToken
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, message: 'Token inválido' };
  }
};

module.exports = {verifyToken};
