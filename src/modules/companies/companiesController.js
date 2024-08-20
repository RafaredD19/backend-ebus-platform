const CompanyModel = require('./models/CompanyModel');
const companiesService = require('./companiesService');

const createCompany = async (req, res) => {
  try {
    const company = new CompanyModel(req.body);
    company.validate();  // Validar los datos

    const userId = req.user.user_id; 
    console.log(userId)
    const result = await companiesService.createCompany(company.username, company.password, company.nameCompany, userId);
    res.status(200).json({
      message: 'Compañía creada exitosamente',
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
  createCompany,
};
