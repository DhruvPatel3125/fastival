const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
