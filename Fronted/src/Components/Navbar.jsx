import React, { useContext, useState, useEffect } from 'react'
import "./Navbar.css"
import logo from "../assets/images/images.png"
import cart_icon from "../assets/images/cart_icon.png"
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from './Context/ShopContext'

function Navbar() {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {getTotalCartItems, cartItems} = useContext(ShopContext)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    console.log('Navbar: cartItems changed:', cartItems);
    console.log('Navbar: current cart count:', getTotalCartItems());
  }, [cartItems, getTotalCartItems]);

  const handleLogout = () => {
    try {
      // Remove user data from localStorage
      localStorage.removeItem('user');
      setUser(null);
      
      // Show logout message
      alert('You have been logged out successfully!');
      
      // Navigate to home page
      navigate('/');
      
      // Refresh the page to update navbar
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" height="60px" />
        <p>Shopify</p>
      </div>
      
      <div className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <li onClick={() => { setMenu("home"); setMobileMenuOpen(false); }}>
          <Link style={{color: menu === "home" ? "#FF4141" : "#626262"}} to="/">Home</Link>
          {menu === "home" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("mens"); setMobileMenuOpen(false); }}>
          <Link style={{color: menu === "mens" ? "#FF4141" : "#626262"}} to="/mens">Mens</Link>
          {menu === "mens" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("womens"); setMobileMenuOpen(false); }}>
          <Link style={{color: menu === "womens" ? "#FF4141" : "#626262"}} to="/womens">Womens</Link>
          {menu === "womens" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("kids"); setMobileMenuOpen(false); }}>
          <Link style={{color: menu === "kids" ? "#FF4141" : "#626262"}} to="/kids">Kids</Link>
          {menu === "kids" ? <hr/> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {user ? (
          <div className="user-section">
            <span className="username">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        <div className="cart-icon-container">
          <Link to="/cart"><img src={cart_icon} alt="" height="40px"/></Link>
          <div className="nav-cart-count">{(() => {
            const count = getTotalCartItems();
            console.log('Navbar rendering, cart count:', count);
            return count;
          })()}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
