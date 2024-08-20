const bussinesService = require('./bussinesService');

const createBussines = async (req, res) => {
    const { ruc , name , direction } = req.body;
  
    try {
      const result = await bussinesService.createBussines( ruc , name , direction);
      res.status(200).json({
        message: 'Empresas creada exitosamente',
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
  const bussinesList = req.body; // Se espera un array de objetos con {ruc, name, direction}

  try {
    const result = await bussinesService.createBussinesBulk(bussinesList);
    res.status(200).json({
      message: 'Empresas creadas exitosamente',
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


  module.exports= {
    getAllBussines,
    createBussines,
    createBussinesBulk
}