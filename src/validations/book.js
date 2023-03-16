const Joi = require('joi');

exports.validateAddBook = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    category: Joi.string(),
    author: Joi.string().required(),
    rating: Joi.number(),
    price: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateUpdateBook = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string(),
    author: Joi.string().required(),
    rating: Joi.number(),
    price: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};
