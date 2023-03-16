const mongoose = require('mongoose');

const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },

    transactionAmount: {
      type: Number,
      required: true,
    },
    transactionStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
