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
      <div className="min-h-screen pt-32 pb-24 bg-stone-50 font-sans">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-center mb-12 text-gray-900 uppercase">
            My Account
          </h1>

          <div className="bg-white border border-stone-200 p-8 md:p-12">
            {!editMode ? (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Email Address</span>
                    <p className="text-lg font-light text-gray-900">{formData.email || "Not provided"}</p>
                  </div>
                  <div className="border-t border-stone-100 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Full Name</span>
                    <p className="text-lg font-light text-gray-900">{formData.name || "Not provided"}</p>
                  </div>
                  <div className="border-t border-stone-100 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Phone Number</span>
                    <p className="text-lg font-light text-gray-900">{formData.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex-1 bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 border-2 border-gray-900 bg-transparent text-gray-900 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-300"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-300"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-300"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <button
                    type="submit"
                    className="flex-1 bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex-1 border-2 border-stone-300 bg-transparent text-stone-500 py-4 text-sm font-medium uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
