import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import Header from "../../comp/Header";
import { FaTrash } from "react-icons/fa";
import API_URL from "../../api/config";

function Cart() {

  const { state, dispatch } = useContext(CartContext);

  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />

      {/* Background Section */}
      <div
        className="relative min-h-screen py-14 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cart-bg.jpg')",
        }}
      >
        {/* Dark Overlay for Professional Look */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side - Cart Items */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Shopping Cart ({state.cart.length})
            </h2>

            {state.cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty
              </p>
            ) : (
              state.cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-5 hover:bg-gray-100 transition rounded-lg px-3"
                >
                  {/* Item Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600">NRs {item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            dispatch({ type: "decQty", payload: item._id })
                          }
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({ type: "incQty", payload: item._id })
                          }
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="font-bold text-lg">
                      NRs {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() =>
                        dispatch({ type: "remove", payload: item._id })
                      }
                      className="text-red-500 text-sm flex items-center gap-2 hover:text-red-600"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl h-fit">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>NRs {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-5">
              <span>Shipping</span>
              <span>NRs {shipping.toFixed(2)}</span>
            </div>

            <hr className="mb-5" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>NRs {total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Cart;