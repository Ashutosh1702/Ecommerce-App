import React, { useContext, useState, useEffect } from 'react'
import "./ProductDisplay.css"
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, cartItems } = useContext(ShopContext);
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    if (product && product.id) {
      const numericId = Number(product.id);
      setQuantityInCart(cartItems[numericId] || 0);
    }
  }, [product, cartItems]);

  if (!product) {
    return null;
  }

  // Create an array of images (in a real app, this would come from the product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const productId = Number(product.id);
    if (isNaN(productId)) {
      console.error('Invalid product ID:', product.id);
      return;
    }

    addToCart(productId);
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img src={productImages[selectedImage]} alt={product.name} className="productdisplay-main-img" />
        </div>
        <div className="productdisplay-img-list">
          {productImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${product.name} - view ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={selectedImage === index ? 'selected' : ''}
            />
          ))}
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <span>★★★★★</span>
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price.toFixed(2)}</div>
          <div className="productdisplay-right-price-new">${product.new_price.toFixed(2)}</div>
        </div>
        <div className="productdisplay-right-description">
          A premium quality {product.name.toLowerCase()} from our {product.category} collection. 
          This item features high-quality materials and expert craftsmanship, perfect for any occasion.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size <span style={{ color: '#ff4141', fontSize: '14px' }}>(Required)</span></h1>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div 
                key={size}
                className={selectedSize === size ? 'selected-size' : ''}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="productdisplay-right-quantity">
          <h1>Quantity in Cart: {quantityInCart}</h1>
        </div>
        <button 
          onClick={handleAddToCart} 
          className="productdisplay-right-button"
          disabled={!selectedSize}
          title={!selectedSize ? "Please select a size first" : "Add to Cart"}
        >
          {!selectedSize ? "Select Size to Add" : "Add to Cart"}
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest, {product.category}
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay;
