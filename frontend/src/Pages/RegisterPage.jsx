import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const stateChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/register/", data);
      toast.success("Registered successfully! You can now login.");
      navigate("/login");
      } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Something went wrong. Try again.");
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
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />
         <input
            type="hidden"
            name="role"
            placeholder="user"
            value={data.role}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />

          
          <button className="relative w-full bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] text-white font-semibold py-4 rounded-xl shadow-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-20 transform -translate-x-full animate-shimmer"></span>
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
