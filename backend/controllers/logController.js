const LoginLog = require("../models/LoginLog");

exports.getLoginHistory = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email required" });
  try {
    const logs = await LoginLog.find({ email }).sort({ timestamp: -1 }).limit(500);
    res.json({ logs });
  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
