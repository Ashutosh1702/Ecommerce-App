import React, { useState, useEffect } from "react";
import "./Popular.css";
import data_product from "./../../assets/data/data";
import Item from "./../Item/Item";

const Popular = () => {
  const [activeCategory, setActiveCategory] = useState('women');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced data for men's products with confidence-building elements
  const menProducts = [
    {
      id: 101,
      name: "Men's Casual Shirt",
      category: "men",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop",
      new_price: 45.0,
      old_price: 65.0,
      rating: 4.8,
      reviews: 324,
      badge: "Best Seller",
      confidence: "Premium Cotton | Size Guide Available"
    },
    {
      id: 102,
      name: "Denim Jacket",
      category: "men",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
      new_price: 75.0,
      old_price: 95.0,
      rating: 4.6,
      reviews: 189,
      badge: "Trending",
      confidence: "Durable Denim | 30-Day Return"
    },
    {
      id: 103,
      name: "Sports T-Shirt",
      category: "men",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      new_price: 25.0,
      old_price: 40.0,
      rating: 4.7,
      reviews: 456,
      badge: "Top Rated",
      confidence: "Moisture-Wicking | Athletic Fit"
    },
    {
      id: 104,
      name: "Formal Blazer",
      category: "men",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      new_price: 120.0,
      old_price: 150.0,
      rating: 4.9,
      reviews: 127,
      badge: "Premium",
      confidence: "Tailored Fit | Professional Grade"
    },
    {
      id: 105,
      name: "Leather Boots",
      category: "men",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      new_price: 85.0,
      old_price: 110.0,
      rating: 4.7,
      reviews: 203,
      badge: "Durable",
      confidence: "Genuine Leather | Waterproof"
    },
    {
      id: 106,
      name: "Casual Hoodie",
      category: "men",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      new_price: 55.0,
      old_price: 75.0,
      rating: 4.5,
      reviews: 312,
      badge: "Comfort",
      confidence: "Soft Cotton Blend | Relaxed Fit"
    }
  ];

  const kidsProducts = [
    {
      id: 201,
      name: "Kids Rainbow Dress",
      category: "kids",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop",
      new_price: 30.0,
      old_price: 45.0,
      rating: 4.9,
      reviews: 278,
      badge: "Parent's Choice",
      confidence: "Soft Fabric | Machine Washable"
    },
    {
      id: 202,
      name: "Boys Superhero T-Shirt",
      category: "kids",
      image: "https://images.unsplash.com/photo-1503944168849-4d4f0b644aec?w=300&h=400&fit=crop",
      new_price: 20.0,
      old_price: 30.0,
      rating: 4.8,
      reviews: 512,
      badge: "Kids Favorite",
      confidence: "100% Cotton | Fade Resistant"
    },
    {
      id: 203,
      name: "Kids Denim Overalls",
      category: "kids",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop",
      new_price: 35.0,
      old_price: 50.0,
      rating: 4.7,
      reviews: 156,
      badge: "Durable",
      confidence: "Adjustable Straps | Easy Care"
    },
    {
      id: 204,
      name: "Girls Party Dress",
      category: "kids",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop",
      new_price: 40.0,
      old_price: 60.0,
      rating: 4.8,
      reviews: 203,
      badge: "Special Occasion",
      confidence: "Elegant Design | Comfortable Fit"
    },
    {
      id: 205,
      name: "Kids Sneakers",
      category: "kids",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop",
      new_price: 35.0,
      old_price: 50.0,
      rating: 4.9,
      reviews: 445,
      badge: "Active Kids",
      confidence: "Non-Slip Sole | Easy Velcro"
    },
    {
      id: 206,
      name: "School Backpack",
      category: "kids",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop",
      new_price: 28.0,
      old_price: 40.0,
      rating: 4.6,
      reviews: 178,
      badge: "School Ready",
      confidence: "Lightweight | Multiple Pockets"
    }
  ];

  // Enhanced women's data with confidence elements and additional products
  const enhancedWomenProducts = [
    ...data_product.map((product, index) => ({
      ...product,
      rating: [4.8, 4.7, 4.9, 4.6][index] || 4.7,
      reviews: [234, 189, 345, 156][index] || 200,
      badge: ["Trending", "Best Seller", "Premium", "Top Rated"][index] || "Popular",
      confidence: [
        "Premium Quality | Perfect Fit",
        "Elegant Design | Comfortable",
        "Traditional Style | Modern Comfort",
        "Stylish & Versatile | Quality Fabric"
      ][index] || "Quality Assured"
    })),
    {
      id: 301,
      name: "Designer Handbag",
      category: "women",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop",
      new_price: 89.0,
      old_price: 120.0,
      rating: 4.8,
      reviews: 267,
      badge: "Luxury",
      confidence: "Genuine Leather | Designer Quality"
    },
    {
      id: 302,
      name: "Elegant Heels",
      category: "women",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop",
      new_price: 65.0,
      old_price: 85.0,
      rating: 4.6,
      reviews: 198,
      badge: "Comfort",
      confidence: "Cushioned Sole | All-Day Comfort"
    }
  ];

  const getProductsByCategory = () => {
    switch(activeCategory) {
      case 'women':
        return enhancedWomenProducts;
      case 'men':
        return menProducts;
      case 'kids':
        return kidsProducts;
      default:
        return enhancedWomenProducts;
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

  // Filter and sort products
  const applyFiltersAndSort = (products) => {
    let filtered = [...products];
    
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
    }, 300);
    
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
