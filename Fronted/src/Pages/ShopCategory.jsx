import React, { useContext, useState } from "react";
import "../CSS/ShopCategory.css";
import { ShopContext } from "./../Components/Context/ShopContext";
import dropdown_icon from "../assets/images/dropdown_icon.png";
import Item from "../Components/Item/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(12);
  console.log("ShopCategory all_product:", all_product); // Debug log

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Name: A to Z" },
    { value: "name-za", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" }
  ];

  const getSortedProducts = () => {
    let filteredProducts = all_product.filter(items => 
      props.category && items.category && 
      props.category.trim().toLowerCase() === items.category.trim().toLowerCase()
    );

    switch(sortBy) {
      case "price-low":
        return filteredProducts.sort((a, b) => a.new_price - b.new_price);
      case "price-high":
        return filteredProducts.sort((a, b) => b.new_price - a.new_price);
      case "name-az":
        return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return filteredProducts.sort((a, b) => b.id - a.id);
      default:
        return filteredProducts;
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  const handleLoadMore = () => {
    setItemsToShow(prevItems => prevItems + 12);
  };

  const getDisplayedProducts = () => {
    const sortedProducts = getSortedProducts();
    return sortedProducts.slice(0, itemsToShow);
  };

  const hasMoreProducts = () => {
    return getSortedProducts().length > itemsToShow;
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(itemsToShow, getSortedProducts().length)}</span> out of {getSortedProducts().length} Products
        </p>
        <div className="shopcategory-sort-container">
          <div 
            className="shopcategory-sort"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sort by: {sortOptions.find(option => option.value === sortBy)?.label}
            <img 
              src={dropdown_icon} 
              alt="" 
              height="20px" 
              className={isDropdownOpen ? "rotate" : ""}
            />
          </div>
          {isDropdownOpen && (
            <div className="sort-dropdown">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {getDisplayedProducts().length === 0 ? (
          <div style={{textAlign: 'center', width: '100%', color: '#888', fontSize: '1.2em', margin: '40px 0'}}>No products found for this category.</div>
        ) : (
          getDisplayedProducts().map((items, i) => (
            <Item
              key={i}
              id={items.id}
              name={items.name}
              image={items.image}
              new_price={items.new_price}
              old_price={items.old_price}
            />
          ))
        )}
      </div>
      <div className="shopcategory-loadmore" onClick={hasMoreProducts() ? handleLoadMore : null}>
        {hasMoreProducts() 
          ? `Explore More (${getSortedProducts().length - itemsToShow} more items)`
          : "All Products Loaded"
        }
      </div>
    </div>
  );
};

export default ShopCategory;
