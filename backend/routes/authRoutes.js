const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register); // /api/auth/register
router.post("/login", login);       // /api/auth/login

module.exports = router;
