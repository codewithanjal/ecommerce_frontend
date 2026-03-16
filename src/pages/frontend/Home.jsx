import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Frontend from "../../layout/Frontend";
import { FaSearch } from "react-icons/fa";
import API_URL from "../../api/config";

function Home() {
  const { state, dispatch } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 DEBUG: Check cart in console
  useEffect(() => {
    console.log("Current Cart:", state.cart);
  }, [state.cart]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };


  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");   // ✅ redirect to login properly
      return;
    }

    dispatch({
      type: "addtocart",
      payload: { ...product, quantity: 1 },
    });
  };

  // 🔎 Filter products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Frontend>
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Latest Products
          </h1>

          {/* Search */}
          <div className="flex w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-md outline-none text-gray-800"
            />
            <div className="bg-orange-500 px-3 rounded-r-md flex items-center justify-center">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col bg-white rounded shadow-sm hover:shadow-md transition"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="flex justify-center items-center h-48 mb-3"
                >
                  <img
                    src={
                      product.image
                        ? `${API_URL}/uploads/${product.image}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.title}
                    className="object-cover h-full w-full rounded-t"
                  />
                </Link>

                <div className="px-3 pb-3 flex flex-col flex-grow">
                  <h2 className="font-semibold text-gray-800">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-3">
                    <span className="text-orange-500 font-bold">
                      NRs {product.price}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Frontend>
  );
}

export default Home;