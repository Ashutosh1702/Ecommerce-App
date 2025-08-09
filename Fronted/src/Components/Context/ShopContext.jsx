import React, {createContext, useState, useEffect} from "react";
import all_product from './../../assets/data/all_product';
import data_product from './../../assets/data/data';
import new_collection from './../../assets/data/newcollection';
import CartItem from "../Carditems/CardItem";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    // Initialize cart for all possible product IDs (including high ID ranges like 101-104, 201-211)
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartCount, setCartCount] = useState(0);

    // Load cart data from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
            // Calculate initial cart count
            const count = Object.values(JSON.parse(savedCart)).reduce((a, b) => a + b, 0);
            setCartCount(count);
        }
    }, []);

    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        // Update cart count whenever cart items change
        const count = Object.values(cartItems).reduce((a, b) => a + b, 0);
        setCartCount(count);
    }, [cartItems]);

    const addToCart = (itemId) => {
        console.log('Adding to cart - itemId:', itemId);
        console.log('Current cartItems before adding:', cartItems);
        setCartItems(prev => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            console.log('New cart after adding:', newCart);
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
            }
            return newCart;
        });
    };

    const clearCart = () => {
        const emptyCart = getDefaultCart();
        setCartItems(emptyCart);
        setCartCount(0);
        localStorage.removeItem('cart');
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of all_product) {
            if (cartItems[item.id] > 0) {
                totalAmount += item.new_price * cartItems[item.id];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        console.log('getTotalCartItems called, cartItems:', cartItems);
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                console.log(`Item ${itemId}: ${cartItems[itemId]} items`);
                totalItems += cartItems[itemId];
            }
        }
        console.log('Total cart items:', totalItems);
        return totalItems;
    };

    const getCartItemsWithDetails = () => {
        const allProducts = [...all_product, ...data_product, ...new_collection];
        return Object.entries(cartItems)
            .filter(([, quantity]) => quantity > 0)
            .map(([itemId, quantity]) => {
                const numericId = Number(itemId);
                const product = allProducts.find(p => p.id === numericId);
                return product ? { ...product, quantity } : null;
            })
            .filter(Boolean);
    };

    // Combine all products
    const additionalProducts = [...data_product, ...new_collection].filter(newProduct => 
        !all_product.some(existingProduct => existingProduct.id === newProduct.id)
    );

    const contextValue = {
        all_product: [...all_product, ...additionalProducts],
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getTotalCartItems,
        getCartItemsWithDetails,
        data_product,
        new_collection
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;