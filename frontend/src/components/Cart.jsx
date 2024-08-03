import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <img src={item.image} alt={item.name} />
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
