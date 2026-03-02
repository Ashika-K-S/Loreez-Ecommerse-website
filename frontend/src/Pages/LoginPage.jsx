import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, logout, user } = useAuth();

  const stateChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formsubmit = async (e) => {
    e.preventDefault();

    const email = data.email.trim();
    const password = data.password;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const tokenResponse = await api.post("token/", {
        email,
        password,
      });

      const accessToken = tokenResponse.data?.access;
      const refreshToken = tokenResponse.data?.refresh;
      const userData = tokenResponse.data?.user;

      if (!accessToken || !refreshToken) {
        throw new Error("Token response missing access or refresh token");
      }

      login({
        ...userData,
        access: accessToken,
        refresh: refreshToken,
      });

      toast.success("Login successful");
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.detail ||
          "Invalid credentials or server rejected login"
      );
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            You are already logged in
          </h2>
          <p className="mb-4">Hello, {user.username || user.name}!</p>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-12 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B]">
            LOREEZ
          </h1>
          <div className="mx-auto my-2 w-16 h-1 bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]"></div>
          <p className="text-sm text-gray-500 mt-2">jewellery</p>
        </div>

        <form onSubmit={formsubmit} className="w-full space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={data.email}
            onChange={stateChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={stateChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-stone-500 text-xs tracking-widest uppercase">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;