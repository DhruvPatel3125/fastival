const CartItem = require("../models/CartItem");

exports.addToCart = async (req, res) => {
  try {
    const { userEmail, name, price, image } = req.body;
    if (!userEmail || !name || !price) return res.status(400).json({ message: "Missing fields" });

    const item = new CartItem({ userEmail, name, price, image });
    await item.save();
    res.json({ message: "Added to cart", item });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const items = await CartItem.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    console.error("Remove cart item error:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
