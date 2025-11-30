import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventRental from './components/EventRental';
import WeddingShop from './components/WeddingShop';
import PujaShop from './components/PujaShop';
import HomeDecor from './components/HomeDecor';
import Festivals from './components/Festivals';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Footer from './components/Footer';

// ✅ import admin files
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<EventRental />} />
        <Route path="/event-rental" element={<EventRental />} />
        <Route path="/wedding-shop" element={<WeddingShop />} />
        <Route path="/puja-shop" element={<PujaShop />} />
        <Route path="/home-decor" element={<HomeDecor />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected: cart */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />

        {/* ✅ Admin protected route */}
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
