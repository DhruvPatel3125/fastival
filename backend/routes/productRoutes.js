const express = require("express");
const router = express.Router();
const { getProducts, getProductsByCategory, createProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);
router.post("/", createProduct);

module.exports = router;
