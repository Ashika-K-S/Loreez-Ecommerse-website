import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  HomeIcon,
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-yellow-500">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1
            onClick={handleLogoClick}
            className="text-3xl font-extrabold text-yellow-600 cursor-pointer tracking-wide">
            LOREEZ
          </h1>

          <Link
            to="/"
            className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 font-medium">
            <HomeIcon className="h-5 w-5" /> Home
          </Link>

          <Link
            to="/products"
            className="text-yellow-600 hover:text-yellow-800 font-medium">
            Products
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/wishlist"
            className="relative text-yellow-600 hover:text-yellow-800">
            <HeartIcon className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative text-yellow-600 hover:text-yellow-800">
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 transition-all duration-300 font-semibold">
                <UserIcon className="h-6 w-6" />
                <span>Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform transition-all duration-200 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-yellow-50 font-medium text-gray-700 rounded-t-xl transition-colors">
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 hover:bg-yellow-50 font-medium text-gray-700 transition-colors">
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-yellow-50 font-medium text-gray-700 rounded-b-xl transition-colors">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 transition-all duration-300 font-semibold">
              <UserIcon className="h-6 w-6" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
