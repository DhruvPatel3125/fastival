import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/festival-logo.png';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (typeof setUser === "function") setUser(null);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <img src={logo} alt="ShubhAura Logo" className="logo" />
        <span className="site-name">ShubhAura</span>
      </div>

      {/* Center: Links */}
      <div className="navbar-center">
        {user?.role === "admin" ? (
          // ✅ Only admin sees Admin Dashboard
          <Link to="/admin" className="nav-link">Admin Dashboard</Link>
        ) : (
          // ✅ Normal user sees shop links
          <>
            <Link to="/event-rental" className="nav-link">Event Rental</Link>
            <Link to="/wedding-shop" className="nav-link">Wedding Shop</Link>
            <Link to="/puja-shop" className="nav-link">Puja Shop</Link>
            <Link to="/home-decor" className="nav-link">Home Decor</Link>
            <Link to="/festivals" className="nav-link">Festivals</Link>
            {user && <Link to="/cart" className="nav-link">Cart</Link>}
          </>
        )}
      </div>

      {/* Right: Auth */}
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{ border: "none", background: "transparent", cursor: "pointer" }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
