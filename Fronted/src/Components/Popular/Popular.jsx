import React, { useState, useEffect, useContext, useMemo } from "react";
import "./Popular.css";
import Item from "./../Item/Item";
import { ShopContext } from "../Context/ShopContext";

const Popular = () => {
  const [activeCategory, setActiveCategory] = useState('women');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { all_product } = useContext(ShopContext);

  // Build category lists from global products to avoid ID conflicts
  const { womenProducts, menProducts, kidsProducts } = useMemo(() => {
    const women = all_product.filter(p => p.category === 'women');
    const men = all_product.filter(p => p.category === 'men');
    const kids = all_product.filter(p => p.category === 'kids');
    return { womenProducts: women, menProducts: men, kidsProducts: kids };
  }, [all_product]);

  const getProductsByCategory = () => {
    switch(activeCategory) {
      case 'women':
        return womenProducts;
      case 'men':
        return menProducts;
      case 'kids':
        return kidsProducts;
      default:
        return womenProducts;
    }
  };

  const getCategoryStats = () => {
    switch(activeCategory) {
      case 'women':
        return { customers: '15K+', satisfaction: '98%', returns: '< 2%' };
      case 'men':
        return { customers: '12K+', satisfaction: '97%', returns: '< 3%' };
      case 'kids':
        return { customers: '8K+', satisfaction: '99%', returns: '< 1%' };
      default:
        return { customers: '15K+', satisfaction: '98%', returns: '< 2%' };
    }
  };

  // Attach derived display fields (rating/reviews/badge) without mutating source
  const withDerivedDisplay = (products) => {
    return products.map((p, index) => ({
      ...p,
      rating: p.rating || [4.8, 4.7, 4.9, 4.6][index % 4],
      reviews: p.reviews || [234, 189, 345, 156][index % 4],
      badge: p.badge || ["Trending", "Best Seller", "Premium", "Top Rated"][index % 4],
      confidence: p.confidence || "Quality Assured"
    }));
  };

  // Filter and sort products
  const applyFiltersAndSort = (products) => {
    let filtered = withDerivedDisplay(products);
    
    // Apply price filter
    if (priceFilter !== 'all') {
      switch(priceFilter) {
        case 'under50':
          filtered = filtered.filter(p => p.new_price < 50);
          break;
        case '50to100':
          filtered = filtered.filter(p => p.new_price >= 50 && p.new_price <= 100);
          break;
        case 'over100':
          filtered = filtered.filter(p => p.new_price > 100);
          break;
      }
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.new_price - b.new_price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.new_price - a.new_price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'popular':
      default:
        // Keep original order for popular
        break;
    }
    
    return filtered;
  };

  // Update filtered products when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const products = getProductsByCategory();
      const filtered = applyFiltersAndSort(products);
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy, priceFilter]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSortBy('popular');
    setPriceFilter('all');
  };

  const getCategoryTitle = () => {
    switch(activeCategory) {
      case 'women':
        return 'POPULAR IN WOMEN';
      case 'men':
        return 'POPULAR IN MEN';
      case 'kids':
        return 'POPULAR IN KIDS';
      default:
        return 'POPULAR IN WOMEN';
    }
  };

  return (
    <div className="popular">
      <div className="popular-header">
        <h1>{getCategoryTitle()}</h1>
        
        {/* Trust Statistics */}
        <div className="trust-stats">
          <div className="stat-item">
            <span className="stat-number">{getCategoryStats().customers}</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getCategoryStats().satisfaction}</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getCategoryStats().returns}</span>
            <span className="stat-label">Return Rate</span>
          </div>
        </div>
        
        <div className="category-tabs">
          <button 
            className={`tab-btn ${activeCategory === 'women' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('women')}
          >
            👩 Women
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'men' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('men')}
          >
            👨 Men
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'kids' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('kids')}
          >
            👶 Kids
          </button>
        </div>
        
        {/* Filters and Sorting */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range:</label>
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>
          
          <div className="results-count">
            {filteredProducts.length} products found
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="trust-badge">
            <span className="badge-icon">🛡️</span>
            <span>Secure Shopping</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">🚚</span>
            <span>Free Shipping</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">↩️</span>
            <span>Easy Returns</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">⭐</span>
            <span>Quality Assured</span>
          </div>
        </div>
      </div>
      <hr />
      
      {isLoading ? (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          <div className="popular-item">
            {filteredProducts.map((item, i) => {
              return (
                <div key={i} className="product-card-wrapper">
                  <Item 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    new_price={item.new_price} 
                    old_price={item.old_price} 
                    rating={item.rating} 
                    reviews={item.reviews} 
                    badge={item.badge} 
                    confidence={item.confidence} 
                  />
                </div>
              );
            })}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products match your current filters.</p>
              <button 
                onClick={() => {
                  setSortBy('popular');
                  setPriceFilter('all');
                }}
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Category Highlights */}
      <div className="category-highlights">
        <div className="highlight-card">
          <h3>🎯 Why Choose Our {getCategoryTitle().split(' ')[2]}?</h3>
          <ul>
            <li>✨ Premium quality materials</li>
            <li>🚚 Free shipping on orders over $50</li>
            <li>↩️ 30-day hassle-free returns</li>
            <li>⭐ Average 4.7+ star rating</li>
          </ul>
        </div>
        
        <div className="highlight-card">
          <h3>📞 Need Help?</h3>
          <p>Our style experts are here to help you find the perfect fit!</p>
          <div className="help-buttons">
            <button className="help-btn">💬 Live Chat</button>
            <button className="help-btn">📏 Size Guide</button>
            <button className="help-btn">📞 Call Us</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Popular;;
