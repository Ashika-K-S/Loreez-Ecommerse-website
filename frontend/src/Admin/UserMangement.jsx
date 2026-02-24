import React, { useEffect, useState } from "react";
import api from "../api/api";
import ProtectedRoute from "../Pages/Protect";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(""); 
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", password: "password123", status: "active" });

  
  useEffect(() => {
    api.get("users/")
      .then(res => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err));
  }, []);

  
  const toggleStatus = (user) => {
    const updatedStatus = user.status === "active" ? "blocked" : "active";
    api.patch(`users/${user.id}/`, { status: updatedStatus })
      .then(() => {
        setUsers(prev =>
          prev.map(u => (u.id === user.id ? { ...u, status: updatedStatus } : u))
        );
        setToast(`${user.username || user.name} has been ${updatedStatus === "active" ? "unblocked" : "blocked"}`);
        setTimeout(() => setToast(""), 3000); 
      });
  };

 
  const handleAddUser = (e) => {
    e.preventDefault();
    api.post("users/", newUser)
      .then(res => {
        setUsers(prev => [...prev, res.data]);
        setToast(`${newUser.name} has been added!`);
        setNewUser({ name: "", email: "", role: "user", password: "password123", status: "active" });
        setTimeout(() => setToast(""), 3000);
      })
      .catch(err => {
        console.log(err);
        setToast("Failed to add user. Check if email/username already exists.");
        setTimeout(() => setToast(""), 3000);
      });
  };

  const nonAdminUsers = users.filter(u => u.role !== "admin");

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

     
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition">
          {toast}
        </div>
      )}

     
      <form onSubmit={handleAddUser} className="mb-6 bg-white p-4 rounded shadow flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-700">Add New User</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow font-semibold transition w-32"
        >
          Add User
        </button>
      </form>
      <table className="min-w-full text-left bg-white shadow rounded">
        <thead className="bg-purple-50">
          <tr>
            <th className="py-2 px-4 border-b text-purple-700">Name</th>
            <th className="py-2 px-4 border-b text-purple-700">Email</th>
            <th className="py-2 px-4 border-b text-purple-700">Role</th>
            <th className="py-2 px-4 border-b text-purple-700">Status</th>
            <th className="py-2 px-4 border-b text-purple-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nonAdminUsers.map(u => (
            <tr key={u.id} className="hover:bg-purple-50 transition">
              <td className="py-2 px-4 border-b">{u.username}</td>
              <td className="py-2 px-4 border-b">{u.email}</td>
              <td className="py-2 px-4 border-b">{u.role}</td>
              <td className="py-2 px-4 border-b capitalize">{u.status}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  onClick={() => toggleStatus(u)}
                  className={`text-sm px-2 py-1 rounded font-semibold transition ${
                    u.status === "active"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {u.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
