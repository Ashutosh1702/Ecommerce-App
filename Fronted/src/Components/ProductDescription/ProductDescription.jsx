import React from 'react';
import './ProductDescription.css';
import { productDescriptions } from '../../Data/productDescriptions';

const ProductDescription = ({ product }) => {
  // Debug log to see what product data we're receiving
  console.log('Product data:', product);
  
  // Get the product description data using the product's name as the key
  const productData = productDescriptions[product.name];
  
  // Debug log to see if we found a matching description
  console.log('Found product description:', productData);

  // If no description is found, use default data
  if (!productData) {
    console.log('No description found for product:', product.name);
    return (
      <div className="product-description">
        <div className="description-container">
          <h2>Product Description</h2>
          <div className="description-content">
            <p className="main-description">
              A premium quality {product.name.toLowerCase()} from our {product.category} collection. 
              This item features high-quality materials and expert craftsmanship.
            </p>
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Modern design</li>
                <li>Easy to maintain</li>
                <li>Comfortable fit</li>
              </ul>
            </div>
            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Material:</span>
                  <span className="spec-value">Premium Quality</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Care:</span>
                  <span className="spec-value">Machine wash cold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-description">
      <div className="description-container">
        <h2>Product Description</h2>
        <div className="description-content">
          <p className="main-description">{productData.description}</p>
          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {productData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="product-specs">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {Object.entries(productData.specifications).map(([key, value]) => (
                <div className="spec-item" key={key}>
                  <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription; 