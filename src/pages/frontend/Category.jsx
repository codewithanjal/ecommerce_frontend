import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Frontend from "../../layout/Frontend";
import { CartContext } from "./CartContext";
import API_URL from "../../api/config";

function Category() {

  const { cid } = useParams(); // category ID from URL
  const { dispatch } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Fetch products by category ID
    axios
      .get(`${API_URL}/api/products/category/${cid}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

    // Fetch category name by ID
    axios
      .get(`${API_URL}/api/categories/${cid}`)
      .then(res => setCategoryName(res.data.name))
      .catch(err => console.log(err));
  }, [cid]);

  return (
    <Frontend>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded shadow-sm">
                <img
                  src={product.image ? `${API_URL}/uploads/${product.image}` : "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-orange-500 font-bold">NRs {product.price}</p>
                <button
                  onClick={() => dispatch({ type: "addtocart", payload: { ...product, quantity: 1 } })}
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 mt-2"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products in this category.</p>
        )}
      </div>
    </Frontend>
  );
}

export default Category;