const cameraService = require('./cameraService');

const getCamerasByDateRange = async (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    const result = await cameraService.getCamerasByDateRange(fromDate, toDate);
    
    if (result.length === 0) {
      return res.status(200).json({
        message: 'No hay conteo para este rango de fechas',
        status: true,
        data: [],
      });
    }

    res.status(200).json({
      message: 'Cámaras listadas exitosamente',
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


const createCameraCount = async (req, res) => {
  const { vehicle_id, door, count, dateCount } = req.body;

  try {
    const result = await cameraService.createCameraCount(vehicle_id, door, count, dateCount);
    res.status(200).json({
      message: 'Conteo de cámara creado exitosamente',
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

const createCameraCountsBulk = async (req, res) => {
  const cameraCountsList = req.body; // Se espera un array de objetos con {vehicle_id, door, count, dateCount}

  try {
    const result = await cameraService.createCameraCountsBulk(cameraCountsList);
    res.status(200).json({
      message: 'Conteos de cámaras creados exitosamente',
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
  getCamerasByDateRange,
  createCameraCount,
  createCameraCountsBulk
};
