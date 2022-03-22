const mongoose = require("mongoose");

const CartModel = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        productImage: {
          type: String,
          required: true
        },
        productTitle: {
          type: String,
          required: true
        },
        productPrice: {
          type: Number,
          required: true
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartModel);