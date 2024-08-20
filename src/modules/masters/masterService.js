const db = require('../../config/db');

const createMaster = async (bussines_id, username, password, masterName) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    // Crear el usuario en la tabla tb_user
    const [userResult] = await connection.execute(
      'INSERT INTO tb_user (bussines_id, username, password, role) VALUES (?, ?, ?, ?)',
      [bussines_id, username, password, 'MASTER']
    );

    const user_id = userResult.insertId;

    // Crear el registro en la tabla tb_master
    await connection.execute(
      'INSERT INTO tb_master (user_id, masterName) VALUES (?, ?)',
      [user_id, masterName]
    );

    await connection.commit();
    connection.release();

    return { user_id, bussines_id, username, masterName };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error('Error al crear la cuenta MASTER');
  }
};

module.exports = {
  createMaster,
};
