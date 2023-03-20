const restRouter = require('express').Router();

const { authRouter } = require('./auth.routes');
const { bookRouter } = require('./books.routes');
const { cartRouter } = require('./cart.routes');
const { wishlistRouter } = require('./wishlist.routes');
const { orderRouter } = require('./order.routes');
const { categoryRouter } = require('./category.routes');

restRouter.use(authRouter);
restRouter.use(bookRouter);
restRouter.use(cartRouter);
restRouter.use(wishlistRouter);
restRouter.use(orderRouter);
restRouter.use(categoryRouter);

module.exports = { restRouter };
