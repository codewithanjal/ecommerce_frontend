import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Frontend from "../../layout/Frontend";
import { UserContext } from "./UserContext";
import API_URL from "../../api/config";

function Login() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "${API_URL}/api/auth/login",
        { email, password }
      );

      // ✅ Save user properly
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <Frontend>
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
            Welcome Back 👋
          </h1>

          {error && (
            <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </Frontend>
  );
}

export default Login;