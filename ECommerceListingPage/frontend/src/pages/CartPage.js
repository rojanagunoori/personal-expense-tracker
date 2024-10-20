import React from 'react';
import { useCart } from '../context/CartContext';
 

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-container">
      <h2>Cart Page</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} style={{ width: 50 }} />
              <p>{item.name} - {item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
