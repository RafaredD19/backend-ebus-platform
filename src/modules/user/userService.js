const db = require('../../config/db');
const generateToken = require('./jwt/generateToken');

const authenticateUser = async (username, password) => {
  // Asegurarse de que los valores se impriman en el orden correcto
  console.log('Valores recibidos - Username:', username, 'Password:', password);

  const connection = await db.getConnection();
  try {
    // Construir manualmente la consulta para imprimirla
    const sqlQuery = `
      SELECT 
        u.user_id, 
        u.bussines_id, 
        u.username, 
        b.name as bussines_name, 
        b.ruc, 
        b.id as bussines_id 
      FROM tb_user u 
      JOIN tb_bussines b ON u.bussines_id = b.id 
      WHERE u.username = '${username}' AND u.password = '${password}'
    `;
    
    console.log('Consulta SQL:', sqlQuery);

    // Ejecutar la consulta con parámetros
    const [rows] = await connection.execute(
      `SELECT 
         u.user_id, 
         u.bussines_id, 
         u.username, 
         b.name as bussines_name, 
         b.ruc, 
         b.id as bussines_id 
       FROM tb_user u 
       JOIN tb_bussines b ON u.bussines_id = b.id 
       WHERE u.username = ? AND u.password = ?`,
      [username, password]
    );

    if (rows.length === 0) {
      throw new Error('Credenciales incorrectas: El usuario no existe o la contraseña es incorrecta');
    }

    const user = rows[0];
    const token = generateToken(user);

    const userResponse = {
      user_id: user.user_id,
      username: user.username,
      bussines: {
        bussines_id: user.bussines_id,
        name: user.bussines_name,
        ruc: user.ruc
      },
      token
    };

    connection.release();
    return userResponse;
  } catch (error) {
    connection.release();
    throw new Error(error.message);
  }
};

module.exports = {
  authenticateUser,
};
