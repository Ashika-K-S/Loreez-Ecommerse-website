import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  const linkClass = ({ isActive }) =>
        `block py-2 px-4 rounded hover:bg-purple-100 transition ${
      isActive ? "bg-purple-200 text-purple-800 font-semibold" : "text-gray-700"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg rounded-r-xl p-6 h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-purple-700">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={linkClass}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={linkClass}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={linkClass}>
              Orders
            </NavLink>
          </li>
          
        </ul>
      </div>

    
      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
