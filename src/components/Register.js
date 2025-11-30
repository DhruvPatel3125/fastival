import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      setFormData({ ...formData, password: "", confirmPassword: "" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created successfully!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage("❌ " + (data.message || data.error || "Signup failed"));
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }
    } catch (err) {
      console.error("Register error:", err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
        </div>

        <button type="submit" className="register-btn">Create Account</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
