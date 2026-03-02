import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans">
      <div className="w-full max-w-md p-10 md:p-14 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] border border-stone-100 flex flex-col items-center">
        <div className="text-center mb-10 flex flex-col items-center">
          <h4 className="uppercase tracking-[0.4em] text-[10px] text-stone-400 mb-3">
            Join The Collection
          </h4>
          <h1 className="text-4xl font-serif tracking-[0.2em] text-gray-900 uppercase">
            Register
          </h1>
          <div className="w-12 h-[1px] bg-stone-200 mt-6"></div>
        </div>

        <form onSubmit={formSubmit} className="w-full space-y-7">
          <div className="space-y-5">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
                value={data.name}
                onChange={stateChange}
                className="w-full bg-stone-50/50 border-b border-stone-200 py-3 px-4 text-sm focus:outline-none focus:border-gray-950 transition-colors placeholder-stone-300"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                value={data.email}
                onChange={stateChange}
                className="w-full bg-stone-50/50 border-b border-stone-200 py-3 px-4 text-sm focus:outline-none focus:border-gray-950 transition-colors placeholder-stone-300"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1.5 ml-1">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={data.password}
                onChange={stateChange}
                className="w-full bg-stone-50/50 border-b border-stone-200 py-3 px-4 text-sm focus:outline-none focus:border-gray-950 transition-colors placeholder-stone-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-4 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-black transition-all duration-500 shadow-xl mt-4"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10 w-full pt-8 border-t border-stone-100 flex flex-col items-center">
          <p className="text-stone-400 text-[10px] tracking-widest uppercase mb-3">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="text-gray-900 border-b border-gray-900 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:text-stone-500 transition-colors"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;