import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom';

const Item = (props) => {
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">⭐</span>);
    }
    
    return stars;
  };

  return (
    <div className='item'>
      {/* Product Badge */}
      {props.badge && (
        <div className="product-badge">
          {props.badge}
        </div>
      )}
      
      <Link to={`/product/${props.id}`} onClick={(e) => {
        if (!props.id) {
          e.preventDefault();
          console.error('Invalid product ID');
        }
      }}>
        <img src={props.image} alt={props.name || 'Product image'} />
      </Link>
      
      <div className="item-content">
        <p className="item-name">{props.name || 'Product Name'}</p>
        
        {/* Rating and Reviews */}
        {props.rating && (
          <div className="item-rating">
            <div className="stars">
              {renderStars(props.rating)}
            </div>
            <span className="rating-text">
              {props.rating} ({props.reviews || 0} reviews)
            </span>
          </div>
        )}
        
        {/* Confidence Text */}
        {props.confidence && (
          <div className="item-confidence">
            {props.confidence}
          </div>
        )}
        
        <div className='item-prices'>
          <div className="item-price-new">
            ${formatPrice(props.new_price)}
          </div>
          <div className="item-price-old">
            ${formatPrice(props.old_price)}
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="item-trust">
          <span className="trust-indicator">✓ Quality Assured</span>
          <span className="trust-indicator">✓ Fast Shipping</span>
        </div>
      </div>
    </div>
  )
}

export default Item
