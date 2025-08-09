import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Item/Item';
import './RelatedProducts.css';

const RelatedProducts = ({ category, currentProductId }) => {
    const { all_product } = useContext(ShopContext);
    
    // Filter products by category and exclude current product
    const relatedProducts = all_product
        .filter(product => 
            product.category === category && 
            product.id !== currentProductId
        )
        .slice(0, 4); // Show only 4 related products

    return (
        <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-container">
                {relatedProducts.map((item) => (
                    <Item 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts; 