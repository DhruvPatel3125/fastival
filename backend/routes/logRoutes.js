const express = require("express");
const { getLoginHistory } = require("../controllers/logController");
const router = express.Router();

router.get("/login-history", getLoginHistory);

module.exports = router;
