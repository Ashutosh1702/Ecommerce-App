import React, { useContext, useEffect } from 'react'
import { ShopContext } from './../Components/Context/ShopContext';
import { useParams, useNavigate } from 'react-router-dom';
import BredCrums from '../Components/Bredcrums/BredCrums';
import './Product.css';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductDescription from '../Components/ProductDescription/ProductDescription';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const navigate = useNavigate();
  
  // Convert productId to number and validate
  const numericId = Number(productId);
  const product = all_product.find((e) => e.id === numericId);

  // Debug logs
  console.log('Product ID from URL:', productId);
  console.log('Numeric ID:', numericId);
  console.log('Found product:', product);
  console.log('All products count:', all_product.length);
  console.log('Product IDs in all_product:', all_product.map(p => p.id));

  useEffect(() => {
    // If product is not found, redirect to home after a short delay
    if (!product) {
      console.error('Product not found:', numericId);
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [product, navigate, numericId]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <p>Redirecting to home page...</p>
        <button onClick={() => navigate('/')}>Return to Home Now</button>
      </div>
    );
  }
  
  return (
    <div className="product-page">
      <BredCrums product={product}/>
      <ProductDisplay product={product}/>
      <ProductDescription product={product}/>
      <RelatedProducts category={product.category} currentProductId={product.id}/>
    </div>
  );
}

export default Product;
