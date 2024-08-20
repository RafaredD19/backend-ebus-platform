const db = require('../../config/db');

const getAllVehicles = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM tb_vehicle');
    connection.release();
    return rows;
  } catch (error) {
    connection.release();
    throw new Error('Error al listar los vehículos');
  }
};


const createVehicle = async (plate, vehicle_id, direction, bussines_id) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      await connection.execute(
        'INSERT INTO tb_vehicle (plate, vehicle_id, direccion, bussines_id) VALUES (?, ?, ?, ?)',
        [plate, vehicle_id, direction, bussines_id]
      );
      await connection.commit();
      connection.release();
      return { plate, vehicle_id, direction, bussines_id };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw new Error('Error al crear el vehículo');
    }
  };


  const createVehiclesBulk = async (vehiclesList) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const query = 'INSERT INTO tb_vehicle (plate, vehicle_id, direccion, bussines_id) VALUES (?, ?, ?, ?)';
      for (const vehicle of vehiclesList) {
        const { plate, vehicle_id, direction, bussines_id } = vehicle;
        await connection.execute(query, [plate, vehicle_id, direction, bussines_id]);
      }
      await connection.commit();
      connection.release();
      return vehiclesList;
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw new Error('Error al crear los vehículos de manera masiva');
    }
  };


module.exports = {
  getAllVehicles,
  createVehicle,
  createVehiclesBulk
};
