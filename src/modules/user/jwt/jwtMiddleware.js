const verifyToken = require('./verifyToken');

const jwtRoleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(403).json({ message: 'No se proporcionó un token', status: false });
    }

    // Extraer el token después de 'Bearer'
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    const { valid, decoded, message } = verifyToken(token);

    if (!valid) {
      return res.status(401).json({ message: `Error del token: ${message}`, status: false });
    }

    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'No estás autorizado para acceder a este servicio', status: false });
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
