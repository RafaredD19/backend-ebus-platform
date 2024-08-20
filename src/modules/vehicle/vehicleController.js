const VehicleModel = require('./models/VehicleModel');
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
  try {
    const vehicle = new VehicleModel(req.body);
    vehicle.validate();  // Validar los datos

    const result = await vehicleService.createVehicle(vehicle.plate, vehicle.vehicle_id, vehicle.direction, vehicle.bussines_id);
    res.status(200).json({
      message: 'Vehículo creado exitosamente',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error: ${error.message}`,
      status: false,
    });
  }
};

const createVehiclesBulk = async (req, res) => {
  try {
    const vehiclesList = req.body.map(data => {
      const vehicle = new VehicleModel(data);
      vehicle.validate();  // Validar cada vehículo
      return vehicle;
    });

    const result = await vehicleService.createVehiclesBulk(vehiclesList);
    res.status(200).json({
      message: 'Vehículos creados exitosamente',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error de validación o en el servidor: ${error.message}`,
      status: false,
    });
  }
};

module.exports = {
  getAllVehicles,
  createVehicle,
  createVehiclesBulk
};
