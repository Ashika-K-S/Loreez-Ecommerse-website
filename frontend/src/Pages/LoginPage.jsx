import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const stateChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data.email)
      console.log(data.password)
      const result = await api.post("users/login/", data);
      console.log(result.data)

      if (result.data.user && result.data.user.id) {
        if(result.data.user.status === "active"){
          const { user: userData, access, refresh } = result.data;
          
          // Store tokens for the API interceptor
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          
          login(userData);

          toast.success("Login successful");
          if (userData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Admin Blocked You")
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.log("Login error", error);
      alert("Something went wrong, please try again");
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            You are already logged in
          </h2>
          <p className="mb-4">Hello, {user.name}!</p>
          <button
            onClick={() => {
              login(null);
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
            required
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={stateChange}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
          />

          <button
            type="submit"
            className="relative w-full bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] font-semibold py-4 rounded-xl shadow-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative text-white bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B]">
              Login
            </span>
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-semibold cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
