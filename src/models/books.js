const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },
    category: { type: Schema.Types.ObjectId, required: false, ref: 'Category' },
    author: {
      type: String,
      required: [true, 'Author is required.'],
      trim: true,
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: String,
      required: [true, 'Price is required'],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('Book', bookSchema);
