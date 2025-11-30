const express = require("express");
const User = require("../models/User");
const Cart = require("../models/Cart");
const LoginLog = require("../models/LoginLog");

// ✅ Only allow admin
const isAdmin = (req, res, next) => {
  if (req.headers["x-user-email"] === "admin@gmail.com") return next();
  return res.status(403).json({ message: "Forbidden - Admins only" });
};

// ✅ Get all users
const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
};

// ✅ Get all cart items
const getCarts = async (req, res) => {
  const items = await Cart.find().sort({ createdAt: -1 });
  res.json({ items });
};

// ✅ Get all login logs
const getLogs = async (req, res) => {
  const logs = await LoginLog.find().sort({ timestamp: -1 });
  res.json({ logs });
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// ✅ Delete cart item
const deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Cart item deleted" });
};

// ✅ NEW: Create cart item
const createCart = async (req, res) => {
  try {
    const { userEmail, name, price, quantity, image } = req.body;

    // Validate required fields
    if (!userEmail || !name || !price || !quantity) {
      return res.status(400).json({ 
        message: "User email, name, price, and quantity are required" 
      });
    }

    // Validate price is a positive number
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ 
        message: "Price must be a positive number" 
      });
    }

    // Validate quantity is a positive integer
    if (isNaN(quantity) || parseInt(quantity) <= 0) {
      return res.status(400).json({ 
        message: "Quantity must be a positive number" 
      });
    }

    // Check if user exists (optional but recommended)
    const userExists = await User.findOne({ email: userEmail });
    if (!userExists) {
      return res.status(404).json({ 
        message: "User not found with the provided email" 
      });
    }

    const newCartItem = new Cart({
      userEmail,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      image: image || ""
    });

    const savedItem = await newCartItem.save();
    
    res.status(201).json({ 
      message: "Cart item created successfully",
      item: savedItem 
    });
  } catch (error) {
    console.error("Create cart error:", error);
    res.status(500).json({ 
      message: "Failed to create cart item",
      error: error.message 
    });
  }
};

// ✅ NEW: Update cart item
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail, name, price, quantity, image } = req.body;

    // Validate required fields
    if (!userEmail || !name || !price || !quantity) {
      return res.status(400).json({ 
        message: "User email, name, price, and quantity are required" 
      });
    }

    // Validate price is a positive number
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ 
        message: "Price must be a positive number" 
      });
    }

    // Validate quantity is a positive integer
    if (isNaN(quantity) || parseInt(quantity) <= 0) {
      return res.status(400).json({ 
        message: "Quantity must be a positive number" 
      });
    }

    // Check if cart item exists
    const existingItem = await Cart.findById(id);
    if (!existingItem) {
      return res.status(404).json({ 
        message: "Cart item not found" 
      });
    }

    // Check if user exists (optional but recommended)
    const userExists = await User.findOne({ email: userEmail });
    if (!userExists) {
      return res.status(404).json({ 
        message: "User not found with the provided email" 
      });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      {
        userEmail,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        image: image || ""
      },
      { new: true } // Return updated document
    );

    res.json({ 
      message: "Cart item updated successfully",
      item: updatedItem 
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ 
      message: "Failed to update cart item",
      error: error.message 
    });
  }
};

module.exports = {
  isAdmin,
  getUsers,
  getCarts,
  getLogs,
  deleteUser,
  deleteCart,
  createCart,  // NEW
  updateCart   // NEW
};