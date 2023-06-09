const { Book } = require('../models');

exports.addBook = async (req, res) => {
  try {
    const { title, description, author, category, rating, price } = req.body;
    const { files } = req;
    const image = files.map((img) => img.filename);
    const book = await Book.create({
      title,
      description,
      author,
      image,
      category,
      rating,
      price,
    });
    return res
      .status(201)
      .json({ status: 201, message: 'Book added successfully!', data: book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, author, category, rating, price } = req.body;
    const data = await Book.findOne({ _id: id });

    if (!data) {
      return res.status(400).json({
        message: 'Book does not exist!',
      });
    }
    const result = await Book.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          author,
          category,
          rating,
          price,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      statusCode: 200,
      message: 'Book updated successfully!',
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Book id is required!',
      });
    }

    const data = await Book.findByIdAndDelete({ _id: id });

    if (!data) {
      return res.status(400).json({
        message: 'Book does not exist!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Book deleted successfully!',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Book id is required!',
      });
    }
    const data = await Book.findOne({ _id: id });

    if (!data) {
      return res.status(400).json({
        message: 'Book does not exist!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Book details fetched successfully!',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getAllBook = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    const { title, author, category, orderby, price } = req.query;
    // const result = await Book.find()
    //   .populate({
    //     path: 'category',
    //     match: { _id: { $eq: category } },
    //     select: { type: 1, _id: 0 },
    //   })
    //   .then((orders) => orders.filter((order) => order.category != null));
    const filter = {};
    if (title) filter.title = title;
    if (author) filter.author = author;
    // if (category) filter.category.type = category;
    const data = await Book.find(filter)
      .populate('category')
      .sort({
        createdAt: orderby === 'most_recent' ? -1 : 1,
        // price: price === 'high_to_low' ? -1 : 1,
      })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    if (!data) {
      return res.status(400).json({
        message: 'Books does not exist!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Book details fetched successfully!',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
