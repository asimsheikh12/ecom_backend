const authRouter = require('express').Router();

const {
  Routes: { AUTH },
} = require('../constants');

const {
  authController: {
    signupHandler,
    loginHandler,
    changePassword,
    forgotPassword,
    updateUser,
  },
} = require('../controller');

const { verifyToken } = require('../middlewares');

const {
  auth: {
    validateSignup,
    validateLogin,
    validateUser,
    validateChangePassword,
    validateForgotPassword,
    validateUpdateUser,
  },
} = require('../validations');

authRouter.post(AUTH.SIGNUP, validateSignup, signupHandler);

authRouter.post(AUTH.LOGIN, validateLogin, loginHandler);

authRouter.patch(
  AUTH.CHANGE_PASSWORD,
  verifyToken,
  validateChangePassword,
  changePassword,
);
authRouter.patch(
  AUTH.FORGOT_PASSWORD,
  verifyToken,
  validateForgotPassword,
  forgotPassword,
);

authRouter.patch(AUTH.UPDATE_USER, verifyToken, validateUser, updateUser);

module.exports = { authRouter };
