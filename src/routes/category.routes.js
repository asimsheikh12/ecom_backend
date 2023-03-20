const categoryRouter = require('express').Router();
const {
  Routes: { CATEGORY },
} = require('../constants');
const {
  categoryController: {
    addCategory,
    updateCategory,
    getCategoryById,
    getAllCategory,
    deleteCategory,
  },
} = require('../controller');
const { verifyToken } = require('../middlewares');

categoryRouter.post(CATEGORY, verifyToken, addCategory);
categoryRouter.patch(`${CATEGORY}/:id`, verifyToken, updateCategory);
categoryRouter.get(`${CATEGORY}/:id`, getCategoryById);
categoryRouter.get(CATEGORY, getAllCategory);
categoryRouter.delete(`${CATEGORY}/:id`, verifyToken, deleteCategory);

module.exports = { categoryRouter };
