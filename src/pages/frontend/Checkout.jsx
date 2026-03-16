// src/pages/frontend/Checkout.jsx
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";
import Frontend from "../../layout/Frontend.jsx";
import API_URL from "../../api/config";

function Checkout() {

  const { state, dispatch } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!user) {
      alert("Please login to proceed to checkout!");
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    if (!user) return;
    if (state.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = { customer: data, items: state.cart, totalAmount: total };

    try {
      await axios.post(`${API_URL}/api/orders`, orderData);
      alert("Order placed successfully!");
      dispatch({ type: "clearCart" });
      navigate("/");
    } catch (err) {
      alert("Failed to place order!");
    }
  };

  return (
    <Frontend>
      <div className="min-h-screen py-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
          <input {...register("name", { required: true })} placeholder="Full Name" className="w-full px-3 py-2 border rounded" />
          {errors.name && <p className="text-red-500">Name is required</p>}

          <input {...register("email", { required: true })} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input {...register("phone", { required: true })} placeholder="Phone" className="w-full px-3 py-2 border rounded" />
          {errors.phone && <p className="text-red-500">Phone is required</p>}

          <textarea {...register("address", { required: true })} placeholder="Address" className="w-full px-3 py-2 border rounded"></textarea>
          {errors.address && <p className="text-red-500">Address is required</p>}

          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Place Order</button>
        </form>
      </div>
    </Frontend>
  );
}

export default Checkout;