const express = require("express");
const router = express.Router();
const {
  isAdmin,
  getUsers,
  getCarts,
  getLogs,
  deleteUser,
  deleteCart,
  createCart,  // NEW
  updateCart   // NEW
} = require("../controllers/adminController");

// ✅ Admin Routes
router.get("/users", isAdmin, getUsers);
router.get("/carts", isAdmin, getCarts);
router.get("/logs", isAdmin, getLogs);

// ✅ User Management
router.delete("/user/:id", isAdmin, deleteUser);

// ✅ Cart Management
router.post("/cart", isAdmin, createCart);        // NEW
router.put("/cart/:id", isAdmin, updateCart);     // NEW
router.delete("/cart/:id", isAdmin, deleteCart);

module.exports = router;