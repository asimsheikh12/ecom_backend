const { Wishlist } = require('../models');

exports.addToWishlist = async (req, res) => {
  const { user, productId, quantity, price } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId: user.id });

    if (wishlist) {
      // wishlist exists for user
      const itemIndex = wishlist.products.findIndex(
        (p) => p.productId === productId,
      );

      if (itemIndex > -1) {
        // product exists in the wishlist, update the quantity
        return res.status(403).json({
          status: 403,
          message: 'Item already exists in wishlist',
        });
      }
      // product does not exists in wishlist, add new item
      wishlist.products.push({ productId, quantity, price });
      wishlist = await wishlist.save();
      return res.status(201).json({
        status: 201,
        message: 'Item added successfully',
        data: wishlist,
      });
    }
    // no wishlist for user, create new wishlist
    const newCart = await Wishlist.create({
      userId: user.id,
      products: [{ productId, quantity, price }],
    });

    return res.status(201).json({
      status: 201,
      message: 'Item added successfully',
      data: newCart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteItemsFromWishlist = async (req, res) => {
  try {
    const { user } = req.body;
    const { productId } = req.params;

    const data = await Wishlist.findOne({ userId: user.id });

    if (!data) {
      return res.status(400).json({
        message: 'Wishlist does not exist!',
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

exports.getWishlist = async (req, res) => {
  try {
    const { user } = req.body;
    const data = await Wishlist.findOne({ userId: user.id }).populate({
      path: 'products',
      populate: {
        path: 'productId',
      },
    });

    if (!data) {
      return res.status(400).json({
        message: 'Wishlist is empty!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Wishlist details fetched successfully!',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.emptyWishlist = async (req, res) => {
  try {
    const { user } = req.body;
    const wishlist = await Wishlist.findOne({ userId: user.id });

    if (!wishlist) {
      return res.status(400).json({
        message: 'Wishlist is empty!',
      });
    }
    const result = await Wishlist.deleteMany({});

    return res.status(200).json({
      statusCode: 200,
      message: 'Wishlist emptied successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
