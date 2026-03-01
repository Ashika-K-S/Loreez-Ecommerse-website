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
      <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans">
        <div className="bg-white border border-stone-200 p-12 text-center max-w-md w-full">
          <h2 className="text-xl font-serif text-gray-900 mb-4 uppercase tracking-wider">
            Already Signed In
          </h2>
          <p className="text-stone-500 font-light mb-8">Welcome back, {user.name}.</p>
          <button
            onClick={() => {
              login(null);
              navigate("/login");
            }}
            className="w-full bg-gray-900 text-white px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans p-6">
      <div className="w-full max-w-md p-10 md:p-12 bg-white border border-stone-200">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-[0.2em] uppercase mb-2">
            Loreez
          </h1>
          <p className="text-xs text-stone-400 uppercase tracking-widest">Fine Jewelry</p>
        </div>

        <form onSubmit={formsubmit} className="w-full space-y-8">
          <div className="space-y-6">
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
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500 tracking-wider">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-gray-900 font-medium uppercase tracking-widest cursor-pointer hover:text-stone-500 transition-colors ml-2"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
