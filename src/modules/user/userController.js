const UserModel = require('./models/UserModel');

const userService = require('./userService');

const authenticateUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    user.validate();  // Validar los datos
    
    const result = await userService.authenticateUser(user.password, user.username);
    res.status(200).json({
      message: 'Autenticación exitosa',
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

module.exports = {
  authenticateUser,
};
