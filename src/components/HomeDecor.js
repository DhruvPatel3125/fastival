import React from "react";
import "../index.css";
import axios from "axios";

function HomeDecor() {
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
      title: "Wall Hanging",
      items: [
        { name: "Ganesha Wall Decor Hanging for gifts", price: "₹350", image: "/images/wall1.jpg" },
        { name: "Metal Wall Art , Wall hanging", price: "₹350", image: "/images/wall2.jpg" },
        { name: "Radha Krishna with Tree Hanging", price: "₹250", image: "/images/wall3.jpg" },
        { name: "Ganesha Wall Decor Hanging", price: "₹330", image: "/images/wall4.jpg" },
      ],
    },
    {
      title: "Table Top Decor",
      items: [
        { name: "Wedding & Event Return Gift", price: "₹290", image: "/images/tbl1.jpg" },
        { name: "Metal Elephant Candle,Tabletop", price: "₹350", image: "/images/tbl2.jpg" },
        { name: "Wrought Iron Handi Tea Light- Diya Holder", price: "₹200", image: "/images/tbl3.jpg" },
        { name: "Warli Hand Painted Wooden Coasters", price: "₹190", image: "/images/tbl4.jpg" },
      ],
    },
    {
      title: "Candles/Candle Holder",
      items: [
        { name: "Decorative Clay Diyas with Wax", price: "₹150", image: "/images/can1.jpg" },
        { name: "Metal Tea Light Candles", price: "₹80", image: "/images/can2.webp" },
        { name: "Matki Clay Diya (12 Pcs) for Diwali", price: "₹40", image: "/images/can3.jpg" },
        { name: "Matki Clay Diya (12 Pcs) for Diwali", price: "₹100", image: "/images/can4.jpg" },
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

export default HomeDecor;
