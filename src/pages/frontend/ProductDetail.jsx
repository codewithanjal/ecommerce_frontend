import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Frontend from "../../layout/Frontend";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import { ChevronRight, Star, Truck, ShieldCheck, MessageCircle } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add products to cart!");
      return navigate("/login");
    }
    dispatch({ type: "addtocart", payload: { ...product, quantity } });
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please login to buy products!");
      return navigate("/login");
    }
    dispatch({ type: "clearCart" });
    dispatch({ type: "addtocart", payload: { ...product, quantity } });
    navigate("/checkout");
  };

  if (loading) return <Frontend><div className="p-20 text-center">Loading...</div></Frontend>;
  if (!product) return <Frontend><div className="p-20 text-center text-red-500">Product not found.</div></Frontend>;

  return (
    <Frontend>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4 flex items-center">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <ChevronRight size={14} className="mx-1" />
            <span>{product.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left: Product Image & Info */}
            <div className="bg-white rounded-lg p-6 flex-1 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square w-full rounded-md overflow-hidden border">
                    <img
                      src={product.image ? `http://localhost:5000/uploads/${product.image}` : "https://via.placeholder.com/400"}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>

                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor"/>)}
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-orange-500">Rs. {product.price}</div>
                    <div className="text-sm text-gray-400 line-through">Rs. {(product.price * 1.1).toFixed(0)}</div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span>Quantity</span>
                    <div className="flex items-center border rounded">
                      <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-100">-</button>
                      <span className="px-4">{quantity}</span>
                      <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 py-1 bg-gray-100">+</button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBuyNow} className="flex-1 bg-cyan-500 text-white py-3 rounded">Buy Now</button>
                    <button onClick={handleAddToCart} className="flex-1 bg-orange-500 text-white py-3 rounded">Add to Cart</button>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t pt-6">
                <h2 className="font-semibold mb-3">Product Details</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 space-y-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-sm text-gray-500 mb-2">Delivery Options</h3>
                <div className="flex items-center gap-2 mb-2"><Truck size={18}/><span>Standard Delivery - Rs. {product.shippingCharge}</span></div>
                <div className="flex items-center gap-2"><ShieldCheck size={18}/>14 Days Free Return</div>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-sm text-gray-500 mb-2">Sold By</h3>
                <div className="flex justify-between items-center">
                  <span>{product.seller || "Default Store"}</span>
                  <MessageCircle size={16} className="text-blue-500"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Frontend>
  );
}

export default ProductDetail;