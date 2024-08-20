// src/modules/user/jwt/jwtRoleMiddleware.js
const verifyToken = require('./verifyToken');

const jwtRoleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'No token provided', status: false });
    }

    const { valid, decoded, message } = verifyToken(token);

    if (!valid) {
      return res.status(401).json({ message: `Token error: ${message}`, status: false });
    }

    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: `Access denied: Requires ${requiredRole} role`, status: false });
    }

    req.user = decoded;
    next();
  };
};

// Funciones específicas para cada rol
const jwtMasterMiddleware = jwtRoleMiddleware('MASTER');
const jwtCompanyMiddleware = jwtRoleMiddleware('COMPANY');
const jwtSuperMasterMiddleware = jwtRoleMiddleware('SUPER_MASTER');

module.exports = {
  jwtMasterMiddleware,
  jwtCompanyMiddleware,
  jwtSuperMasterMiddleware,
};
