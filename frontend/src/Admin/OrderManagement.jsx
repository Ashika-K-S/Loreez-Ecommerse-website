import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import ProtectedRoute from "../Pages/Protect";


const OrderManagement = () => {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);

  
  const fetchOrders = async () => {
    try {
      const res = await api.get("orders/");
      const ordersData = res.data.results || (Array.isArray(res.data) ? res.data : []);
      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user?.role !== "admin") return; 
    fetchOrders();
  }, [user]);

 
  const markAsDelivered = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    try {
      await api.patch(`orders/${orderId}/`, {
        status: "delivered",
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "delivered" } : o
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (!user || user.role !== "admin")
    return <p className="text-center mt-10">Access denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>

      <table className="min-w-full border-collapse bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.user_id}</td>
              <td className="py-2 px-4 border-b">₹{order.total_amount}</td>
              <td className="py-2 px-4 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                {order.status !== "delivered" && (
                  <button
                    onClick={() => markAsDelivered(order.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
