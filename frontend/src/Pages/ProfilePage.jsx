import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!", { position: "top-right" });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    toast.success("Profile updated!", { position: "top-right" });
    setEditMode(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-24 bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-yellow-700">Profile</h1>

          {!editMode ? (
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Email: </span>
                {formData.email || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Name: </span>
                {formData.name || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {formData.phone || "Not provided"}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded shadow font-semibold transition">
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow font-semibold transition">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required/>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required/>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow font-semibold transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded shadow font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
