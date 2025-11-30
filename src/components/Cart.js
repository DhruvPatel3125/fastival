import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/cart?email=${user.email}`);
      setItems(res.data.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
      alert("Failed to load cart");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      console.error("Remove cart item error:", err);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <h3>Please login to view your cart</h3>;

  return (
    <div className="card-container">
  {items.map((item) => (
    <div key={item._id} className="product-card">
      <div className="cart-image">
        <img src={item.image || "/images/default.jpg"} alt={item.title} />
      </div>
      <h4>{item.name}</h4>
      <p>Price: ₹{item.price}</p>
      <button onClick={() => handleRemove(item._id)}>Remove</button>
    </div>
  ))}
</div>

  );
};

export default Cart;
