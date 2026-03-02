import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const stateChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const name = data.name.trim();
    const email = data.email.trim();
    const password = data.password;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("users/register/", {
        name,
        email,
        password,
        role: "user",
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error?.response?.data || error.message);

      toast.error(
        error?.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    }
  };

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

        <form onSubmit={formSubmit} className="w-full space-y-6">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={stateChange}
            autoComplete="name"
            required
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={stateChange}
            autoComplete="email"
            required
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={stateChange}
            autoComplete="new-password"
            required
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />

          <button
            type="submit"
            className="relative w-full bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] text-white font-semibold py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;