import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCheckout = async () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    try {
      const { data } = await axios.post('http://localhost:5001/api/payment', {
        name,
        email,
        basketItems: cartItems,
        totalPrice,
      });
      window.location.href = data.paymentPageUrl; // İyzico ödeme sayfasına yönlendirme
    } catch (err) {
      console.error('Payment failed.', err);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button onClick={handleCheckout}>Pay with Iyzico</button>
    </div>
  );
};

export default Checkout;
