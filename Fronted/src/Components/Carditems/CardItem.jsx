import React, { useContext, useState } from 'react'
import "./Carditems.css"
import remove_icon from "../../assets/images/remove.webp"
import { ShopContext } from '../Context/ShopContext';
import PaymentOptions from '../PaymentOptions/PaymentOptions';
import { useNavigate } from 'react-router-dom';

const CartItem = () => {
    const { all_product, cartItems, removeFromCart, addToCart, clearCart } = useContext(ShopContext);
    const [showPayment, setShowPayment] = useState(false);
    const navigate = useNavigate();

    // Calculate total amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of all_product) {
            if (cartItems[item.id] > 0) {
                totalAmount += item.new_price * cartItems[item.id];
            }
        }
        return totalAmount;
    };

    const handlePaymentComplete = async (paymentMethod = 'credit-card') => {
        try {
            // Get current user data
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            
            // Get cart items with details
            const cartItemsWithDetails = all_product.filter(item => cartItems[item.id] > 0)
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.new_price,
                    quantity: cartItems[item.id],
                    total: item.new_price * cartItems[item.id]
                }));
            
            // Create order object
            const order = {
                id: Date.now().toString(),
                userId: user ? user.id : 'guest',
                userEmail: user ? user.email : 'guest@example.com',
                userName: user ? user.username : 'Guest User',
                items: cartItemsWithDetails,
                totalAmount: getTotalCartAmount(),
                paymentMethod: paymentMethod,
                orderDate: new Date().toISOString(),
                status: 'completed'
            };
            
            // Save order to JSON server
            const response = await fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            });
            
            if (response.ok) {
                // Clear the cart after successful payment and order saving
                clearCart();
                
                // Hide payment modal
                setShowPayment(false);
                
                // Show detailed success message
                alert(`🎉 Payment Successful!\n\nOrder ID: ${order.id}\nTotal: $${order.totalAmount.toFixed(2)}\nItems: ${order.items.length}\n\nThank you for your purchase! Redirecting to home page...`);
                
                // Redirect to home page after successful payment
                setTimeout(() => {
                    navigate('/');
                }, 2000); // 2 second delay to let user read the success message
            } else {
                throw new Error('Failed to save order');
            }
        } catch (error) {
            console.error('Order processing error:', error);
            
            // Still clear cart even if order saving fails
            clearCart();
            setShowPayment(false);
            
            alert('Payment successful! However, there was an issue saving your order details. Your cart has been cleared. Redirecting to home page...');
            
            // Redirect to home page even if there was an error saving order
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    return (
        <div className='cardItems'>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((item) => {
                if (cartItems[item.id] > 0) {
                    return (
                        <div key={item.id} className="cartitems-formate">
                            <img src={item.image} alt={item.name} className='carticon-product-icon' />
                            <p>{item.name}</p>
                            <p>${item.new_price.toFixed(2)}</p>
                            <div className="cartitems-quantity">
                                <button 
                                    className="cartitems-quantity-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    -
                                </button>
                                <span className="cartitems-quantity-count">{cartItems[item.id]}</span>
                                <button 
                                    className="cartitems-quantity-btn"
                                    onClick={() => addToCart(item.id)}
                                >
                                    +
                                </button>
                            </div>
                            <p>${(item.new_price * cartItems[item.id]).toFixed(2)}</p>
                            <img 
                                src={remove_icon} 
                                alt="Remove" 
                                className="cartitems-remove-icon"
                                onClick={() => removeFromCart(item.id)}
                            />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total cartitems-total-right">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Total</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowPayment(true)} className="cartitems-checkout-btn-right">PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="classitem-promocode">
                        <input type="text" placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>

            {showPayment && (
                <PaymentOptions 
                    totalAmount={getTotalCartAmount()} 
                    onPaymentComplete={handlePaymentComplete}
                    onCancel={() => setShowPayment(false)}
                />
            )}
        </div>
    );
};

export default CartItem;
