const cartRouter = require('express').Router();
const {
  Routes: { CART },
} = require('../constants');

const {
  cartController: { addToCart, getCartDetails, deleteItemsFromCart, emptyCart },
} = require('../controller');

const {
  cart: { validateAddToCart },
} = require('../validations');

const { verifyToken } = require('../middlewares');

cartRouter.post(CART, verifyToken, validateAddToCart, addToCart);
cartRouter.get(CART, verifyToken, getCartDetails);
cartRouter.delete(`${CART}/:productId`, verifyToken, deleteItemsFromCart);
cartRouter.delete(CART, verifyToken, emptyCart);

module.exports = { cartRouter };
