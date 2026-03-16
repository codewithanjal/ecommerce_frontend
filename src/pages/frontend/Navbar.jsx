import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { state } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          MyShop
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>

          <Link to="/contact" className="hover:text-orange-500">
            Contact
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-orange-500">
            Cart
            {state.cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {state.cart.length}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <>
              <span className="text-gray-600">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;