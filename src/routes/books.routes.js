const bookRouter = require('express').Router();
const {
  Routes: { BOOK },
} = require('../constants');
const {
  bookController: { addBook, updateBook, getBook, deleteBook, getAllBook },
} = require('../controller');
const { verifyToken, uploadMultiple } = require('../middlewares');
const {
  book: { validateAddBook, validateUpdateBook },
} = require('../validations');

bookRouter.post(BOOK, verifyToken, uploadMultiple, validateAddBook, addBook);
bookRouter.patch(`${BOOK}/:id`, verifyToken, validateUpdateBook, updateBook);
bookRouter.get(`${BOOK}/:id`, getBook);
bookRouter.delete(`${BOOK}/:id`, verifyToken, deleteBook);
bookRouter.get(BOOK, getAllBook);

module.exports = { bookRouter };
