const cameraService = require('./cameraService');
const CameraCountModel = require('./models/CameraCountModel');

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
  try {
    const cameraCount = new CameraCountModel(req.body);
    
    // Validar los datos
    cameraCount.validate();
  
    const result = await cameraService.createCameraCount(cameraCount.vehicle_id, cameraCount.door, cameraCount.count, cameraCount.dateCount);
    res.status(200).json({
      message: 'Conteo de cámara creado exitosamente',
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

const createCameraCountsBulk = async (req, res) => {
  const cameraCountsList = req.body; 
  try {
    
    cameraCountsList.forEach(data => {
      const cameraCount = new CameraCountModel(data);
      cameraCount.validate(); 
    });

   
    const result = await cameraService.createCameraCountsBulk(cameraCountsList);
    res.status(200).json({
      message: 'Conteos de cámaras creados exitosamente',
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
  getCamerasByDateRange,
  createCameraCount,
  createCameraCountsBulk
};
