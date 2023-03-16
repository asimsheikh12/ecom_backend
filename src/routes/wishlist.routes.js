const wishlistRouter = require('express').Router();
const {
  Routes: { WISHLIST },
} = require('../constants');

const {
  wishlistController: {
    addToWishlist,
    getWishlist,
    deleteItemsFromWishlist,
    emptyWishlist,
  },
} = require('../controller');

const {
  wishlist: { validateAddToWishlist },
} = require('../validations');

const { verifyToken } = require('../middlewares');

wishlistRouter.post(
  WISHLIST,
  verifyToken,
  validateAddToWishlist,
  addToWishlist,
);

wishlistRouter.get(WISHLIST, verifyToken, getWishlist);

wishlistRouter.delete(
  `${WISHLIST}/:productId`,
  verifyToken,
  deleteItemsFromWishlist,
);

wishlistRouter.delete(WISHLIST, verifyToken, emptyWishlist);

module.exports = { wishlistRouter };
