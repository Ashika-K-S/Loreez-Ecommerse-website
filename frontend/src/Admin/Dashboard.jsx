import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../Pages/Protect";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
