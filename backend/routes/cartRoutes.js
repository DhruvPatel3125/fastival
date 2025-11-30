const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ✅ Get all cart items (?email=)
router.get("/", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const items = await Cart.find({ userEmail: email });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart items", error: err.message });
  }
});

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  console.log("📩 Incoming cart data:", req.body); // Debug log

  const { userEmail, name, price, quantity, image } = req.body;

  if (!userEmail || !name || !price || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const item = new Cart({ userEmail, name, price, quantity, image });
    await item.save();
    res.json({ message: "Item added to cart", item });
  } catch (err) {
    console.error("❌ Add to cart failed:", err);
    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
});

// ✅ Delete a cart item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
});

module.exports = router;
