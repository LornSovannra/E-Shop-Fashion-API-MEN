const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true, },
    image: { type: String, required: true },
    price: { type: Number },
    countInStock: { type: Number },
    brand: { type: String },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductModel);