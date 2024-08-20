const db = require('../../config/db');

const createCompany = async (username, password, nameCompany, userId) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    // Buscar el master_id usando el user_id
    const [masterRow] = await connection.execute(
      'SELECT master_id, masterName FROM tb_master WHERE user_id = ?',
      [userId]
    );

    if (masterRow.length === 0) {
      throw new Error('No se encontró un master asociado al user_id');
    }

    const masterId = masterRow[0].master_id;
    const masterName = masterRow[0].masterName;

    // Crear el usuario en la tabla tb_user
    const [userResult] = await connection.execute(
      'INSERT INTO tb_user (username, password, role) VALUES (?, ?, ?)',
      [username, password, 'COMPANY']
    );

    const newUserId = userResult.insertId;  // Este es el user_id que se acaba de crear

    // Crear el registro en la tabla tb_companies y obtener el company_id
    const [companyResult] = await connection.execute(
      'INSERT INTO tb_companies (user_id, master_id, nameCompany) VALUES (?, ?, ?)',
      [newUserId, masterId, nameCompany]
    );

    const newCompanyId = companyResult.insertId;  // Este es el company_id generado

    await connection.commit();
    connection.release();

    return {
      companyId: newCompanyId,
      userId: newUserId,
      username,
      nameCompany,
      master: {
        masterId,
        masterName
      }
    };
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('Error al crear la compañía:', error);  // Log para depuración
    throw new Error('Error al crear la compañía');
  }
};

module.exports = {
  createCompany,
};
