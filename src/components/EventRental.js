import React from "react";
import "../index.css";
import axios from "axios"; // ✅ FIX: import axios

function EventRental() {
  // ✅ Get logged-in user from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // ✅ Handle add to cart
  const handleAddToCart = async (item) => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userEmail: user.email,
        name: item.name,
        price: Number(item.price.toString().replace(/[^0-9]/g, "")), // 👈 ensure numeric
        quantity: 1,
        image: item.image,
      });

      alert(`${item.name} added to cart!`);
      console.log("✅ Cart response:", response.data);
    } catch (err) {
      console.error("❌ Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  // ✅ Your original sections
  const sections = [
    {
      title: "DIY Indian Event Decor",
      items: [
        { name: "Rental - Decorative umbrella", price: "₹560", image: "/images/diy1.jpg" },
        { name: "Metallic Twist with Pomander piece", price: "₹3500", image: "/images/diy2.jpg" },
        { name: "Rental - Flower Wedding Centerpiece", price: "₹1500", image: "/images/diy3.jpg" },
        { name: "Rental - Bridal Entrance Chaddar", price: "₹2500", image: "/images/diy4.jpg" },
      ],
    },
    {
      title: "Full Setup Mandap",
      items: [
        { name: "Mandap Design 4 Floral For Wedding", price: "₹25000", image: "/images/set1.jpg" },
        { name: "Mandap Garden - DIY Backyard Wedding", price: "₹40000", image: "/images/set2.jpg" },
        { name: "Floral Garden For Wedding", price: "₹35000", image: "/images/set3.jpg" },
        { name: "Sankheda Floral Garden Mandap", price: "₹42000", image: "/images/set4.jpg" },
      ],
    },
    {
      title: "Favors / Gifts",
      items: [
        { name: "Wedding Return Gift", price: "₹299", image: "/images/fav1.jpg" },
        { name: "Customized Mug", price: "₹399", image: "/images/fav2.jpg" },
        { name: "Customized Mug", price: "₹399", image: "/images/fav3.jpg" },
        { name: "Customized Mug", price: "₹399", image: "/images/fav4.jpg" },
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

export default EventRental;
