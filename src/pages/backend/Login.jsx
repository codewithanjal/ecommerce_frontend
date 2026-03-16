import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api/config";

function Login() {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "${API_URL}/api/auth/login",
        data
      );

      console.log(res.data);

      // Only allow admin users
      if (res.data.user && res.data.user.isAdmin) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/dashboard"); // go to admin dashboard
      } else {
        alert("You are not authorized to access the admin dashboard.");
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Login failed. Check your credentials."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Decorative Gradient Circle */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-500/30 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">
        <h2 className="text-4xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-center text-gray-300 mb-8">
          Welcome back 👋 Please login to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-lg hover:from-blue-600 hover:to-purple-600 active:scale-95 transition-all shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;