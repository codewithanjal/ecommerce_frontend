import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Context
import { UserContext } from "./pages/frontend/UserContext";
import { CartProvider } from "./pages/frontend/CartContext";

// Pages
import Home from "./pages/frontend/Home";
import Category from "./pages/frontend/Category";
import Cart from "./pages/frontend/Cart";
import Checkout from "./pages/frontend/Checkout";
import Contact from "./pages/frontend/Contact";
import ProductDetail from "./pages/frontend/ProductDetail";
import Login from "./pages/frontend/Login";

import AdminLogin from "./pages/backend/Login";
import Dashboard from "./pages/backend/Dashboard";
import AdminCategory from "./pages/backend/AdminCategory";
import AdminProduct from "./pages/backend/AdminProduct";
import AdminOrder from "./pages/backend/AdminOrder";
import RouteProtection from "./pages/backend/RouteProtection";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Frontend Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:cid" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/dashboard"
              element={
                <RouteProtection>
                  <Dashboard />
                </RouteProtection>
              }
            />
            <Route
              path="/admincategory"
              element={
                <RouteProtection>
                  <AdminCategory />
                </RouteProtection>
              }
            />
            <Route
              path="/adminproduct"
              element={
                <RouteProtection>
                  <AdminProduct />
                </RouteProtection>
              }
            />
            <Route
              path="/adminorder"
              element={
                <RouteProtection>
                  <AdminOrder />
                </RouteProtection>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserContext.Provider>
  );
}

export default App;