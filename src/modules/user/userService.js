const db = require('../../config/db');
const generateToken = require('./jwt/generateToken');

const authenticateUser = async (username, password) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT user_id, bussines_id, role, username FROM tb_user WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0) {
      throw new Error('Credenciales incorrectas: El usuario no existe o la contraseña es incorrecta');
    }

    const user = rows[0];
    const token = generateToken(user);

    await connection.execute('UPDATE tb_user SET token = ? WHERE user_id = ?', [token, user.user_id]);

    connection.release();
    return { user_id: user.user_id, username: user.username, role: user.role, bussines_id: user.bussines_id, token };
  } catch (error) {
    connection.release();
    throw new Error(error.message);
  }
};

module.exports = {
  authenticateUser,
};
