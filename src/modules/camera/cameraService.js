const db = require('../../config/db');

const getCamerasByDateRange = async (fromDate, toDate) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT 
         c.id,
         c.vehicle_id,
         v.plate,
         v.direccion,
         b.ruc,
         b.name as bussines_name,
         c.door,
         c.count,
         c.dateCount
       FROM tb_camera c
       JOIN tb_vehicle v ON c.vehicle_id = v.id
       JOIN tb_bussines b ON v.bussines_id = b.id
       WHERE c.dateCount BETWEEN ? AND ?`,
      [fromDate, toDate]
    );
    connection.release();
    return rows.map(row => ({
      id: row.id,
      vehicle: {
        vehicle_id: row.vehicle_id,
        plate: row.plate,
        direction: row.direccion
      },
      bussines: {
        ruc: row.ruc,
        name: row.bussines_name
      },
      door: row.door,
      count: row.count,
      dateCount: row.dateCount
    }));
  } catch (error) {
    connection.release();
    throw new Error('Error al listar las cámaras por rango de fechas');
  }
};


const createCameraCount = async (vehicle_id, door, count, dateCount) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    await connection.execute(
      'INSERT INTO tb_camera (vehicle_id, door, count, dateCount) VALUES (?, ?, ?, ?)',
      [vehicle_id, door, count, dateCount]
    );
    await connection.commit();
    connection.release();
    return { vehicle_id, door, count, dateCount };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error('Error al crear el conteo de cámara');
  }
};


const createCameraCountsBulk = async (cameraCountsList) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    const query = 'INSERT INTO tb_camera (vehicle_id, door, count, dateCount) VALUES (?, ?, ?, ?)';
    for (const cameraCount of cameraCountsList) {
      const { vehicle_id, door, count, dateCount } = cameraCount;
      await connection.execute(query, [vehicle_id, door, count, dateCount]);
    }
    await connection.commit();
    connection.release();
    return cameraCountsList;
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error('Error al crear conteos de cámaras de manera masiva');
  }
};

module.exports = {
  getCamerasByDateRange,
  createCameraCount,
  createCameraCountsBulk
};
