import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      const tokenResponse = await api.post("users/login/", {
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
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans">
      <div className="w-full max-w-md p-10 md:p-14 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] border border-stone-100 flex flex-col items-center">
        <div className="text-center mb-12 flex flex-col items-center">
          <h4 className="uppercase tracking-[0.4em] text-[10px] text-stone-400 mb-3">
            Welcome Back
          </h4>
          <h1 className="text-4xl font-serif tracking-[0.2em] text-gray-900 uppercase">
            Loreez
          </h1>
          <div className="w-12 h-[1px] bg-stone-200 mt-6"></div>
        </div>

        <form onSubmit={formsubmit} className="w-full space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                value={data.email}
                onChange={stateChange}
                className="w-full bg-stone-50/50 border-b border-stone-200 py-3.5 px-4 text-sm focus:outline-none focus:border-gray-950 transition-colors placeholder-stone-300"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2 ml-1">
                Security Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={data.password}
                onChange={stateChange}
                className="w-full bg-stone-50/50 border-b border-stone-200 py-3.5 px-4 text-sm focus:outline-none focus:border-gray-950 transition-colors placeholder-stone-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-4 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-black transition-all duration-500 shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="mt-12 w-full pt-8 border-t border-stone-100 flex flex-col items-center">
          <p className="text-stone-400 text-[10px] tracking-widest uppercase mb-4">
            New to the collection?
          </p>
          <Link
            to="/register"
            className="text-gray-900 border-b border-gray-900 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Create An Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;