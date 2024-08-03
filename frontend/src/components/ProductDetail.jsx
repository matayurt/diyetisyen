import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async() => {
            const { data } = await axios.get(`http://localhost:5001/api/products/${id}`)
            setProduct(data)
        }

        fetchProducts()
    }, [id]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  )
}

export default ProductDetail