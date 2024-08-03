import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
// COMPONENTS
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Hakkimda from "./components/Hakkimda";
import Iletisim from "./components/Iletisim";
import Paketler from "./components/Paketler";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Cart from "./components/Cart";
import Checkout from "./components/CheckoutForm";
import AdminPanel from "./components/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" exact element={<Home user={user} />} />
              <Route path="/hakkimda" element={<Hakkimda />} />
              <Route path="/paketler" element={<Paketler />} />
              <Route path="/iletisim" element={<Iletisim />} />
              <Route
                path="/register"
                element={<RegisterForm setUser={setUser} />}
              />
              <Route path="/login" element={<LoginForm setUser={setUser} />} />
              <Route path="/sepet" element={<Cart setUser={setUser} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route element={<AdminRoute user={user} />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
