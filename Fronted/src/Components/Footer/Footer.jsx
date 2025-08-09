import React from 'react'
import "./Footer.css"
import logo from "../../assets/images/logo.webp"
import insta_logo from "../../assets/images/instagram.png"
import facebook_logo from "../../assets/images/facebook.png"
import whatsapp_logo from "../../assets/images/whatsapp.png"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Shopify Logo" height="45px" />
            <p>Shopify</p>
          </div>
          <p className="footer-description">
            Your one-stop destination for premium fashion. 
            Discover the latest trends in men's, women's, and kids' clothing.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className='footer-links'>
            <li>About Us</li>
            <li>Products</li>
            <li>Size Guide</li>
            <li>Shipping Info</li>
            <li>Returns</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul className='footer-links'>
            <li>Men's Fashion</li>
            <li>Women's Fashion</li>
            <li>Kids Collection</li>
            <li>Accessories</li>
            <li>Sale Items</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className='footer-social-icons'>
            <div className="footer-icon-container" title="Follow us on Instagram">
                <img src={insta_logo} alt="Instagram" height="24px"/>
            </div>
            <div className="footer-icon-container" title="Like us on Facebook">
                <img src={facebook_logo} alt="Facebook" height="24px"/>
            </div>
            <div className="footer-icon-container" title="Chat on WhatsApp">
                <img src={whatsapp_logo} alt="WhatsApp" height="24px" />
            </div>
          </div>
          <div className="footer-contact">
            <p>📧 support@shopify.com</p>
            <p>📞 +91 1234567890</p>
            <p>📍 123 Fashion St, Style City</p>
          </div>
        </div>
      </div>
      
      <div className='footer-bottom'>
        <hr />
        <div className="footer-bottom-content">
          <p>© {currentYear} Shopify. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
