const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, image, category });
    const savedProduct = await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  createProduct,
};
