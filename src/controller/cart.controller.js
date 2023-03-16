const { Cart, Book } = require('../models');

exports.addToCart = async (req, res) => {
  const { user, productId, quantity, price } = req.body;
  try {
    let cart = await Cart.findOne({ userId: user.id });
    const product = await Book.findOne({ _id: productId });
    if (product.price !== price) {
      return res.status(400).json({
        status: 400,
        message: 'Item price is incorrect',
      });
    }
    if (cart) {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId === productId,
      );

      if (itemIndex > -1) {
        const productItem = cart.products[itemIndex];

        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, quantity, price });
      }
      cart = await cart.save();
      return res.status(201).json({
        status: 201,
        message: 'Cart updated successfully',
        data: cart,
      });
    }
    const newCart = await Cart.create({
      userId: user.id,
      products: [{ productId, quantity, price }],
    });

    return res.status(201).json({
      status: 201,
      message: 'Cart updated successfully',
      data: newCart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteItemsFromCart = async (req, res) => {
  try {
    const { user } = req.body;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: 'Book id is required!',
      });
    }

    const data = await Cart.findOne({ userId: user.id });

    if (!data) {
      return res.status(400).json({
        message: 'Cart does not exist!',
      });
    }
    const result = await data.products.pull({ productId });
    await data.save();
    return res.status(200).json({
      statusCode: 200,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getCartDetails = async (req, res) => {
  try {
    const { user } = req.body;
    const data = await Cart.findOne({ userId: user.id }).populate({
      path: 'products',
      populate: {
        path: 'productId',
      },
    });

    if (!data) {
      return res.status(400).json({
        message: 'Cart is empty!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Cart details fetched successfully!',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const { user } = req.body;
    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return res.status(400).json({
        message: 'Cart is empty!',
      });
    }
    const result = await Cart.deleteMany({ _id: cart.id });

    return res.status(200).json({
      statusCode: 200,
      message: 'Cart emptied successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
