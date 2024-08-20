const MasterModel = require('./models/masterModel');
const masterService = require('./masterService');

const createMaster = async (req, res) => {
  try {
    const master = new MasterModel(req.body);
    master.validate();  // Validar los datos

    const result = await masterService.createMaster(master.bussines_id, master.username, master.password, master.masterName);
    res.status(200).json({
      message: 'Cuenta MASTER creada exitosamente',
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


const getAllMasters = async (req, res) => {
    try {
      const result = await masterService.getAllMasters();
      res.status(200).json({
        message: 'Cuentas MASTER listadas exitosamente',
        status: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error: ${error.message}`,
        status: false,
      });
    }
  };
module.exports = {
  createMaster,
  getAllMasters
};
