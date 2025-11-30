import React from "react";
import "../index.css";
import axios from "axios";

function PujaShop() {
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
      title: "Diya, Kalash, Puja Thali, Prayer Vessels",
      items: [
        { name: "Akhand Jyot Diya Oil Lamp Brass", price: "₹200", image: "/images/diya1.jpg" },
        { name: "Hand Held 5 Way Arti Diya - Brass", price: "₹120", image: "/images/diya2.jpg" },
        { name: "Flower Design Puja Diya Oil Lamp", price: "₹90", image: "/images/diya3.jpg" },
        { name: "Copper Kalash/ Lota for Puja", price: "₹60", image: "/images/diya4.jpg" },
      ],
    },
    {
      title: "All Puja items",
      items: [
        { name: "Janoi/ Sacred Thread, Daily Puja", price: "₹50", image: "/images/poja1.jpg" },
        { name: "Havankund for Puja, Havan, Vedic Rituals", price: "₹200", image: "/images/poja2.jpg" },
        { name: "Brass Incense Burner - Ganesh, Leaf", price: "₹200", image: "/images/poja3.jpg" },
        { name: "BetelNut / Puja Supari For Poja", price: "₹40", image: "/images/poja4.jpg" },
      ],
    },
    {
      title: "Puja Kits - TyoharBox",
      items: [
        { name: "Yagnopavit / Janoi Package (Complete)", price: "₹700", image: "/images/god1.jpg" },
        { name: "Satya Narayan Puja Kit - Essential", price: "₹400", image: "/images/god2.jpg" },
        { name: "Complete Wedding Puja Samagri Kit", price: "₹550", image: "/images/god3.jpg" },
        { name: "Satya Narayan Puja Kit - Complete", price: "₹600", image: "/images/god4.jpg" },
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

export default PujaShop;
