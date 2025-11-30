import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ✅ check for hardcoded admin first
    if (formData.email === "admin@gmail.com" && formData.password === "imadmin") {
      const adminUser = {
        name: "Admin",
        email: formData.email,
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      if (typeof setUser === "function") setUser(adminUser);
      setMessage("✅ Welcome Admin!");
      setFormData({ email: "", password: "" });
      setTimeout(() => navigate("/admin"), 500);
      return; // stop here, don’t call backend
    }

    // otherwise normal login through backend
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // backend returns { message, user }
        localStorage.setItem("user", JSON.stringify(data.user));
        if (typeof setUser === "function") setUser(data.user);
        setMessage("✅ " + (data.message || "Login successful"));
        setFormData({ email: "", password: "" });

        // normal users → /event-rental
        setTimeout(() => navigate("/event-rental"), 500);
      } else {
        setMessage("❌ " + (data.message || data.error || "Invalid credentials"));
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <div className="login-actions">
              <button type="submit" className="signin-btn">LOG IN</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>

        <div className="login-right">
          <h3>NEW CUSTOMER?</h3>
          <p>Create an account with us and you'll be able to:</p>
          <ul>
            <li>Check out faster</li>
            <li>Save multiple shipping addresses</li>
            <li>Access your order history</li>
            <li>Track new orders</li>
            <li>Easy returns and refunds</li>
            <li>Manage your account preferences</li>
            <li>Secure payment options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
