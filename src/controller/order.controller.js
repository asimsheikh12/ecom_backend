const { Order, Cart } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { user } = req.body;
    const cartData = await Cart.findOne({ userId: user.id });
    if (cartData) {
      const total = cartData.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );
      // if (transactionAmount === total) {
      const newOrder = await Order.create({
        userId: user.id,
        cartId: cartData.id,
        transactionAmount: total,
      });
      await Cart.deleteMany({ _id: cartData.id });
      return res
        .status(201)
        .json({ message: 'Order placed successfully', data: newOrder });
      // } else {
      //   res.status(409).json({ message: "total amount is incorrect" });
      // }
    }
    return res.status(400).json({ message: 'Cart is empty' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { user } = req.body;
    const orders = await Order.findOne({ userId: user.id }).populate('userId');
    if (!orders) {
      res.status(404).json({ message: 'No orders found!' });
    }
    return res
      .status(200)
      .json({ message: 'Orders fetched successfully!', data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
