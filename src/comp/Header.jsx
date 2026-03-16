// src/comp/Header.jsx
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/frontend/UserContext.jsx";
import { CartContext } from "../pages/frontend/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSignInAlt, FaShoppingCart } from "react-icons/fa";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const { state } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    setUser(null); // clear user context
    localStorage.removeItem("user"); // clear localStorage
    navigate("/"); // redirect to home
  };

  return (
    <header className="bg-gray-900 text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-400">ShopEasy</Link>

        {/* Categories */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          {categories.map((cat) => (
            <Link key={cat._id} to={`/category/${cat._id}`} className="hover:text-orange-400">
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Cart + User */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-orange-400">
            <FaShoppingCart size={22} />
            {state.cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {state.cart.length}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> {/* Different icon for logout */}
              <span className="hidden md:block">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              <FaSignInAlt /> {/* Different icon for login */}
              <span className="hidden md:block">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;