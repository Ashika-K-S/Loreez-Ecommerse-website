import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "../Context/StoreContext";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogoClick = () => navigate("/");
  const handleLogout = () => logout();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-stone-200/50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center text-gray-900">
        
        {/* Left Side: Navigation Links */}
        <div className="hidden md:flex items-center space-x-10 w-1/3">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.3em] font-semibold hover:text-stone-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-[10px] uppercase tracking-[0.3em] font-semibold hover:text-stone-500 transition-colors"
          >
            Collection
          </Link>
        </div>

        {/* Center: Brand Identity */}
        <div className="flex justify-center w-1/3">
          <h1
            onClick={handleLogoClick}
            className="text-2xl md:text-3xl font-serif text-gray-950 cursor-pointer tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform duration-300"
          >
            Loreez
          </h1>
        </div>

        {/* Right Side: Icons & Auth */}
        <div className="flex items-center justify-end space-x-8 w-1/3">
          <Link
            to="/wishlist"
            className="relative hover:text-stone-500 transition-colors"
          >
            <HeartIcon className="h-5 w-5 stroke-[1.2]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-950 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link
            to="/cart"
            className="relative hover:text-stone-500 transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5 stroke-[1.2]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-950 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center hover:text-stone-500 transition-colors outline-none">
                <UserIcon className="h-5 w-5 stroke-[1.2]" />
              </button>
              <div className="absolute right-0 mt-4 w-44 bg-white border border-stone-200 shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 py-2">
                <Link
                  to="/profile"
                  className="block px-6 py-3 text-[10px] tracking-widest uppercase text-gray-600 hover:text-gray-900 hover:bg-stone-50 transition-colors"
                >
                  Account
                </Link>
                <Link
                  to="/orders"
                  className="block px-6 py-3 text-[10px] tracking-widest uppercase text-gray-600 hover:text-gray-900 hover:bg-stone-50 transition-colors"
                >
                  Orders
                </Link>
                <div className="h-[1px] bg-stone-100 mx-4 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-3 text-[10px] tracking-widest uppercase text-red-800 hover:bg-stone-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-[10px] uppercase tracking-[0.3em] font-semibold border-b border-transparent hover:border-gray-900 transition-all text-gray-900"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-[10px] uppercase tracking-[0.3em] font-semibold bg-gray-950 text-white px-5 py-2.5 rounded-full hover:bg-stone-800 transition-all shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

