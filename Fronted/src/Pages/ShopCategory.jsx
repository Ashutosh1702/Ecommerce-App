import React, { useContext } from "react";
import "../CSS/ShopCategory.css";
import { ShopContext } from "./../Components/Context/ShopContext";
import dropdown_icon from "../assets/images/dropdown_icon.png";
import Item from "../Components/Item/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  console.log("ShopCategory all_product:", all_product); // Debug log
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" height="20px" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.filter(items => (props.category && items.category && props.category.trim().toLowerCase() === items.category.trim().toLowerCase())).length === 0 ? (
          <div style={{textAlign: 'center', width: '100%', color: '#888', fontSize: '1.2em', margin: '40px 0'}}>No products found for this category.</div>
        ) : (
          all_product.map((items, i) => {
            if (
              props.category &&
              items.category &&
              props.category.trim().toLowerCase() === items.category.trim().toLowerCase()
            ) {
              return (
                <Item
                  key={i}
                  id={items.id}
                  name={items.name}
                  image={items.image}
                  new_price={items.new_price}
                  old_price={items.old_price}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
