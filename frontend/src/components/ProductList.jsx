// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5001/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handlePurchase = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      console.log('Purchased Product ID: ', productId);
      alert('Purchase Successful!');
    } catch (err) {
      console.error('Error purchasing product: ', err);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} TL</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handlePurchase(product._id)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
