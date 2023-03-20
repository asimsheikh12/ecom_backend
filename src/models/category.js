const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    type: {
      type: String,
      unique: true,
      required: [true, 'Type is required'],
      trim: true,
    },
    updateAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Category', categorySchema);
