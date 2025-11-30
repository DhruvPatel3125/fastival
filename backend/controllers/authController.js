const User = require("../models/User");
const LoginLog = require("../models/LoginLog");

// Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // role will default to "user" in your User model
    const user = new User({ name, email, password });
    await user.save();

    return res.json({ message: "User created" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"] || "";
    const ua = req.get("User-Agent") || "";

    const user = await User.findOne({ email });
    const success = user && user.password === password;

    // log attempt
    await new LoginLog({ email, success, ip, userAgent: ua }).save();

    if (!success) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ updated: include role in response
    const safeUser = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role || "user", // important for admin detection
    };

    return res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
