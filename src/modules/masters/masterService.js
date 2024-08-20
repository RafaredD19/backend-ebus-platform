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

const getAllMasters = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT 
         m.master_id, 
         m.masterName, 
         u.user_id, 
         u.username, 
         u.role,
         b.id as bussines_id,
         b.name as bussines_name,
         b.ruc
       FROM tb_master m 
       JOIN tb_user u ON m.user_id = u.user_id
       JOIN tb_bussines b ON u.bussines_id = b.id
       WHERE u.role = 'MASTER'`  // Filtro para solo listar cuentas con rol MASTER
    );

    const result = rows.map(row => ({
      master_id: row.master_id,
      masterName: row.masterName,
      user_id: row.user_id,
      username: row.username,
      role: row.role,
      bussines: {
        bussines_id: row.bussines_id,
        name: row.bussines_name,
        ruc: row.ruc
      }
    }));

    connection.release();
    return result;
  } catch (error) {
    connection.release();
    throw new Error('Error al listar las cuentas MASTER');
  }
};

module.exports = {
  createMaster,
  getAllMasters
};
