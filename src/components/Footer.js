import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>SHOP</h4>
          <ul>
            <li>Event Rental</li>
            <li>Wedding Shop</li>
            <li>Puja Shop</li>
            <li>Home Decor</li>
            <li>Festivals</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>INFORMATION</h4>
          <ul>
            <li>Blog</li>
            <li>About Us</li>
            <li>Sitemap</li>
          </ul>
        </div>
 
        <div className="footer-section">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping And Returns</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>STAY CONNECTED</h4>
          {/* <div className="social-icons">
            <span>📷</span>
            <span>📘</span>
          </div><br /> */}
          <p>LIKE US ON FACEBOOK</p><br />
          <button className="fb-button">Like 460</button>
        </div>
      </div>

      <div className="footer-bottom">
        <ul>
          <li>Conditions of Use</li>
          <li>Privacy Notice</li>
          <li>Consumer Health Data Privacy Disclosure</li>
          <li>Your Ads Privacy Choices</li>
        </ul>
        <p>© 2025 ShubhAura</p>
      </div>
    </footer>
  );
}

export default Footer;
