const Joi = require('joi');

exports.validateAddToCart = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};
