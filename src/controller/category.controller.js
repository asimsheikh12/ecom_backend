const { Category } = require('../models');

exports.addCategory = async (req, res) => {
  try {
    const { type } = req.body;
    const categoryExist = await Category.findOne({ type });
    if (categoryExist) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const category = await Category.create({ type });
    return res
      .status(201)
      .json({ message: 'Category created successfully', data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const categoryExist = await Category.findOne({ type });
    if (categoryExist) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { $set: { type } },
      {
        new: true,
      },
    );
    return res
      .status(201)
      .json({ message: 'Category updated successfully', data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryExist = await Category.findOne({ _id: id });
    if (!categoryExist) {
      return res.status(400).json({ message: 'Category does not exists' });
    }
    const category = await Category.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json({ message: 'Category deleted successfully', data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    return res
      .status(201)
      .json({ message: 'Category fetched successfully', data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    return res
      .status(201)
      .json({ message: 'Categories fetched successfully', data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
