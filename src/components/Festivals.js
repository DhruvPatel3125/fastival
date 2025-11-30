import React from "react";
import "../index.css";
import axios from "axios";

function Festivals() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const handleAddToCart = async (item) => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userEmail: user.email,
        name: item.name,
        price: Number(item.price.toString().replace(/[^0-9]/g, "")),
        quantity: 1,
        image: item.image,
      });
      alert(`${item.name} added to cart!`);
      console.log("Cart response:", response.data);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  const sections = [
    {
      title: "Diwali",
      items: [
        { name: "Handmade Rangoli with Lotus & Tealight", price: "₹250", image: "/images/diwali1.jpg" },
        { name: "Ready to Use, Reusable Rangoli Mat", price: "₹90", image: "/images/diwali2.jpg" },
        { name: "Toran, Decorative Door Hanging", price: "₹120", image: "/images/diwali3.jpg" },
        { name: "Metal Lotus Diya with Marigold Garland", price: "₹100", image: "/images/diwali4.jpg" },
      ],
    },
    {
      title: "Navratri / Garba",
      items: [
        { name: "Mirror Work Colourfull Lehenga", price: "₹2550", image: "/images/navratri1.webp" },
        { name: "Shravika meena maangtika Unique", price: "₹900", image: "/images/navratri3.webp" },
        { name: "Special Muslin Cotton Lehenga", price: "₹1200", image: "/images/navratri2.webp" },
        { name: "Roshini Stone Anklet For Navratri", price: "₹700", image: "/images/navratri4.webp" },
      ],
    },
    {
      title: "Christmas Decoration",
      items: [
        { name: "Decorative Coconut Shell Tree Decor", price: "₹450", image: "/images/chris1.webp" },
        { name: "Mini Foldable Christmas Tree", price: "₹570", image: "/images/chris2.webp" },
        { name: "Personalized Snowman Stocking", price: "₹400", image: "/images/chris3.webp" },
        { name: "Santa - Gloves - Tree Light Bunting", price: "₹290", image: "/images/chris4.webp" },
      ],
    },
  ];

  return (
    <div className="wedding-shop">
      {sections.map((section, idx) => (
        <div key={idx} className="wedding-section">
          <h3>{section.title}</h3>
          <div className="card-container">
            {section.items.map((item, i) => (
              <div className="product-card" key={i}>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Festivals;
