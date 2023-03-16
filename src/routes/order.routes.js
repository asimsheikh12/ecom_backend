const orderRouter = require('express').Router();
const {
  Routes: { ORDER },
} = require('../constants');
const {
  orderController: { createOrder, getAllOrders },
} = require('../controller');
const { verifyToken } = require('../middlewares');

orderRouter.post(ORDER, verifyToken, createOrder);
orderRouter.get(ORDER, verifyToken, getAllOrders);

module.exports = { orderRouter };
