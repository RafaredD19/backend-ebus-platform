const vehicleService = require('./vehicleService');

const getAllVehicles = async (req, res) => {
  try {
    const result = await vehicleService.getAllVehicles();
    res.status(200).json({
      message: 'Vehículos listados exitosamente',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error en el servidor',
      status: false,
      error: error.message,
    });
  }
};


const createVehicle = async (req, res) => {
    const { plate, vehicle_id, direction, bussines_id } = req.body;
  
    try {
      const result = await vehicleService.createVehicle(plate, vehicle_id, direction, bussines_id);
      res.status(200).json({
        message: 'Vehículo creado exitosamente',
        status: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error en el servidor',
        status: false,
        error: error.message,
      });
    }
  };


  const createVehiclesBulk = async (req, res) => {
    const vehiclesList = req.body; 
    try {
      const result = await vehicleService.createVehiclesBulk(vehiclesList);
      res.status(200).json({
        message: 'Vehículos creados exitosamente',
        status: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error en el servidor',
        status: false,
        error: error.message,
      });
    }
  };
module.exports = {
  getAllVehicles,
  createVehicle,
  createVehiclesBulk
};
