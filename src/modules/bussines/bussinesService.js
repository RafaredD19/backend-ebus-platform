const db = require('../../config/db');


const createBussines = async (ruc , name , direction) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      await connection.execute(
     'INSERT INTO tb_bussines (ruc, name, direction) VALUES (?, ?, ?)',
        [ruc , name , direction]
      );
      await connection.commit();
      connection.release();
      return { ruc , name , direction };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw new Error('Error al crear la empresa');
    }
}


const getAllBussines = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM tb_bussines');
    connection.release();
    return rows;
  } catch (error) {
    connection.release();
    throw new Error('Error al listar las empresas');
  }
};


const createBussinesBulk = async (bussinesList) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    const query = 'INSERT INTO tb_bussines (ruc, name, direction) VALUES (?, ?, ?)';
    for (const bussines of bussinesList) {
      const { ruc, name, direction } = bussines;
      await connection.execute(query, [ruc, name, direction]);
    }
    await connection.commit();
    connection.release();
    return bussinesList;
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error('Error al crear empresas de manera masiva');
  }
};
module.exports= {
    createBussines,
    getAllBussines,
    createBussinesBulk
}