import React from "react";
import "../index.css";
import axios from "axios";

function WeddingShop() {
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
      title: "Gujarati Wedding",
      items: [
        { name: "Designer Kalsh Pots/ Stacked Matki", price: "₹150", image: "/images/guj1.jpg" },
        { name: "Decorative Kankavati Puja - Ganesh", price: "₹500", image: "/images/guj2.jpg" },
        { name: "Brass Raman Divo, Gujarati wedding", price: "₹300", image: "/images/guj3.jpg" },
        { name: "Chheda Bandh/ Chheda Bandhan", price: "₹150", image: "/images/guj4.jpg" },
      ],
    },
    {
      title: "Haldi Sangeet Mehendi",
      items: [
        { name: "Bridal Floral Jewelry Set for Haldi", price: "₹850", image: "/images/san1.jpg" },
        { name: "Floral Jewelry Full Set for Haldi", price: "₹1200", image: "/images/san2.jpg" },
        { name: "Metal Lotus Diya with Marigold Garland", price: "₹100", image: "/images/san3.jpg" },
        { name: "Wedding Brooch/ Bridal Brooch", price: "₹300", image: "/images/san4.jpg" },
      ],
    },
    {
      title: "Favors / Gifts",
      items: [
        { name: "Tealight Candle Holder, Pearl Flowers", price: "₹70", image: "/images/fav1.jpg" },
        { name: "Return Favor Bag / Decorative Potli", price: "₹100", image: "/images/fav2.jpg" },
        { name: "Dry Fruit Tray & Mukhvas Box", price: "₹200", image: "/images/fav3.jpg" },
        { name: "Sari bags, Saree covers", price: "₹50", image: "/images/fav4.jpg" },
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

export default WeddingShop;
