const Joi = require('joi');

exports.validateSignup = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateLogin = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateUser = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    firstName: Joi.string().max(15),
    lastName: Joi.string().max(15),
    email: Joi.string().email(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateChangePassword = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    currentPassword: Joi.string().min(8).max(15).required(),
    newPassword: Joi.string().min(8).max(15).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateForgotPassword = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    password: Joi.string().min(8).max(15).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};

exports.validateUpdateUser = async (req, res, next) => {
  const schema = Joi.object().keys({
    user: Joi.object(),
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/[^\w\s]/gi, ''),
    });
  }
  return next();
};
