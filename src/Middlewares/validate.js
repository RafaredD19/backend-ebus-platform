const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: `Error de validación: ${error.details[0].message}`,
      status: false,
    });
  }
  next();
};
