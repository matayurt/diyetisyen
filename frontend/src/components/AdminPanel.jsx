import React, { useState, useEffect} from "react";
import axios from "axios";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/products')
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products.',err)
      }
    }
    fetchProducts();
  }, [])

  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.post(`http://localhost:5001/api/products/${editingProduct._id}`, newProduct, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          }
        });
      } else {
        await axios.post('http://localhost:5001/api/products', newProduct, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          },
        });
      }
      const { data } = await axios.get('http://localhost:5001/api/products')
      setProducts(data);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        image: '',
      });
      setEditingProduct(null)
    } catch (err) {
      console.error('Product creation/updating failed.', err);
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  }

  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        }
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Product deletion failed.', err)
    }
  }

  return(
    <>
      <div>
      <h1>Admin Panel - Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="countInStock"
          value={newProduct.countInStock}
          onChange={handleChange}
          placeholder="Count In Stock"
          required
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2>Existing Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminPanel;