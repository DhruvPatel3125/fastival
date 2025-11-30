const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // allows parsing JSON request bodies

// ✅ Connect MongoDB
connectDB();

// ✅ API Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// ✅ Default Route (optional health check)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
