const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    user_id: user.user_id,
    username: user.username,
    role: user.role,
    bussines_id: user.bussines_id
  };

  const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  return token;
};

module.exports = generateToken;
