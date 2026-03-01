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
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans p-6">
      <div className="w-full max-w-md p-10 md:p-12 bg-white border border-stone-200">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-[0.2em] uppercase mb-2">
            Loreez
          </h1>
          <p className="text-xs text-stone-400 uppercase tracking-widest">Fine Jewelry</p>
        </div>

        <form onSubmit={formSubmit} className="w-full space-y-8">
          <div className="space-y-6">
            <div>
              <input
                required
                type="text"
                name="name"
                placeholder="Full Name"
                value={data.name}
                onChange={stateChange}
                className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-400 text-sm"
              />
            </div>
            <div>
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={stateChange}
                className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-400 text-sm"
              />
            </div>
            <div>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={stateChange}
                className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-400 text-sm"
              />
            </div>
            <input
              type="hidden"
              name="role"
              value={data.role}
              onChange={stateChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500 tracking-wider">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-gray-900 font-medium uppercase tracking-widest cursor-pointer hover:text-stone-500 transition-colors ml-2"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
