import React from "react";
import "./Hero.css";
import hand_icon from "../../assets/images/hand_icon.png";
import arrow_icon from "../../assets/images/arrow_icon.png";
import mens from "../../assets/images/p8.webp"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-text">🔥 Hot Deals</span>
        </div>
        
        <h1 className="hero-main-title">
          Discover Your
          <span className="highlight-text"> Perfect Style</span>
        </h1>
        
        <h2 className="hero-subtitle">Premium Fashion • Best Prices • Latest Trends</h2>

        <div className="hero-hand-icon">
          <p className="new-text">New</p>
          <img src={hand_icon} alt="New Collection" className="hand-icon-img" />
        </div>
        
        <p className="hero-description">
          Explore our exclusive collection of premium clothing for men, women, and kids. 
          <span className="accent-text">Fashion that speaks your language.</span>
        </p>
        
        <div className="hero-buttons">
          <div className="hero-latest-btn">
            <span>Shop Latest Collections</span>
          </div>
          <div className="hero-secondary-btn">
            <span>View Offers</span>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Brands</span>
          </div>
        </div>
      </div>
      
      <div className="hero-right">
        <div className="hero-image-container">
          <div className="image-backdrop"></div>
          <img src={mens} alt="Fashion Model" className="hero-image" />
          <div className="floating-badge badge-1">
            <span>Premium Quality</span>
          </div>
          <div className="floating-badge badge-2">
            <span>Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
