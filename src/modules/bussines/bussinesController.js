const BussinesModel = require('./models/BussinesModel');
const bussinesService = require('./bussinesService');

const createBussines = async (req, res) => {
  try {
    const bussines = new BussinesModel(req.body);
    bussines.validate();  // Validar los datos

    const result = await bussinesService.createBussines(bussines.ruc, bussines.name, bussines.direction);
    res.status(200).json({
      message: 'Empresa creada exitosamente',
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

const getAllBussines = async (req, res) => {
  try {
    const result = await bussinesService.getAllBussines();
    res.status(200).json({
      message: 'Empresas listadas exitosamente',
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

const createBussinesBulk = async (req, res) => {
  try {
    const bussinesList = req.body.map(data => {
      const bussines = new BussinesModel(data);
      bussines.validate();  // Validar cada empresa
      return bussines;
    });

    const result = await bussinesService.createBussinesBulk(bussinesList);
    res.status(200).json({
      message: 'Empresas creadas exitosamente',
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
  getAllBussines,
  createBussines,
  createBussinesBulk
};
