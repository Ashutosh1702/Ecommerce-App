import React, { useState } from 'react';
import './PaymentOptions.css';
import { FaCreditCard, FaPaypal, FaApple, FaGoogle } from 'react-icons/fa';

const PaymentOptions = ({ totalAmount, onPaymentComplete }) => {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically integrate with a payment gateway
        console.log('Processing payment with:', selectedMethod);
        console.log('Card details:', cardDetails);
        onPaymentComplete();
    };

    return (
        <div className="payment-options">
            <h2>Payment Method</h2>
            <div className="payment-methods">
                <div 
                    className={`payment-method ${selectedMethod === 'credit-card' ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod('credit-card')}
                >
                    <FaCreditCard className="payment-icon" />
                    <span>Credit Card</span>
                </div>
                <div 
                    className={`payment-method ${selectedMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod('paypal')}
                >
                    <FaPaypal className="payment-icon" />
                    <span>PayPal</span>
                </div>
                <div 
                    className={`payment-method ${selectedMethod === 'apple-pay' ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod('apple-pay')}
                >
                    <FaApple className="payment-icon" />
                    <span>Apple Pay</span>
                </div>
                <div 
                    className={`payment-method ${selectedMethod === 'google-pay' ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod('google-pay')}
                >
                    <FaGoogle className="payment-icon" />
                    <span>Google Pay</span>
                </div>
            </div>

            {selectedMethod === 'credit-card' && (
                <form onSubmit={handleSubmit} className="card-details-form">
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            name="cardName"
                            value={cardDetails.cardName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={cardDetails.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength="3"
                                required
                            />
                        </div>
                    </div>
                    <div className="payment-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <button type="submit" className="pay-button">
                        Pay ${totalAmount.toFixed(2)}
                    </button>
                </form>
            )}

            {selectedMethod === 'paypal' && (
                <div className="payment-redirect">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                    <button onClick={handleSubmit} className="pay-button">
                        Continue with PayPal
                    </button>
                </div>
            )}

            {(selectedMethod === 'apple-pay' || selectedMethod === 'google-pay') && (
                <div className="payment-redirect">
                    <p>You will be redirected to {selectedMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'} to complete your payment.</p>
                    <button onClick={handleSubmit} className="pay-button">
                        Continue with {selectedMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions; 