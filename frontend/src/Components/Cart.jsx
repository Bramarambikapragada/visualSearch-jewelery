import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  selectCartItems,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate(); // Hook for navigation

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/', {
          credentials: 'include', // Send cookies with the request
        });

        if (res.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        setIsAuthenticated(true); // User is authenticated
      } catch (err) {
        console.error('Error checking authentication:', err);
        navigate('/login'); // Redirect to login on error (e.g., no token)
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = +(total * 0.18).toFixed(2);
  const grandTotal = +(total + gst).toFixed(2);

  // If not authenticated or still loading, don't render the cart yet
  if (loading) {
    return <div>Loading...</div>; // Optional: Replace with a spinner if desired
  }

  if (!isAuthenticated) {
    return null; // Navigation happens in useEffect, so no need to render anything
  }

  return (
    <div className="body-wrapper">
      <div className="glass-card">
        <h2 className="cart-heading">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.seller}</p>
                    <p className="price">₹{item.price * item.quantity}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrease(item._id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item._id)}>+</button>
                    </div>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="billing-summary">
              <h3>Billing Summary</h3>
              <div className="billing-row">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <div className="billing-row">
                <span>GST (18%):</span>
                <span>₹{gst}</span>
              </div>
              <div className="billing-row billing-total">
                <span>Grand Total:</span>
                <span>₹{grandTotal}</span>
              </div>

              <div className="checkout-btn-wrapper">
                <Link className="checkout-btn" to="/checkout">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;