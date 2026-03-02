import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";


const DashboardHome = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("users/").then((res) => setUsers(Array.isArray(res.data) ? res.data : []));
    api.get("products/?no_pagination=true").then((res) => setProducts(Array.isArray(res.data) ? res.data : []));
    api.get("orders/").then((res) => setOrders(Array.isArray(res.data) ? res.data : []));
  }, []);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value}`;
  };

  const totalRevenue = orders.reduce((sum, order) => {
    if (!order.items || !Array.isArray(order.items)) return sum;
    return (
      sum +
      order.items.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
      )
    );
  }, 0);

  const revenueData = Array.isArray(products) ? products.map((product) => {
    const productRevenue = orders.reduce((acc, order) => {
      if (!order.items || !Array.isArray(order.items)) return acc;
      const item = order.items.find((i) => i.id === product.id);
      return acc + (item ? item.price * item.quantity : 0);
    }, 0);
    return { name: product.name, revenue: productRevenue };
  }) : [];

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const orderPieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const recentOrders = Array.isArray(orders) 
    ? orders
        .slice(-5)
        .reverse()
        .map((order) => ({
          ...order,
          userName: Array.isArray(users) ? users.find((u) => u.id === order.userId)?.name || "Unknown" : "Unknown",
        }))
    : [];

  const topProducts = [...revenueData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const barColors = ["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"];
  const pieColors = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-purple-700">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Orders</h2>
          <p className="text-2xl font-bold text-purple-700">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Revenue</h2>
          <p className="text-2xl font-bold text-purple-700">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Products</h2>
          <p className="text-2xl font-bold text-purple-700">{products.length}</p>
        </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Overview */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {revenueData.map((entry, index) => (
                  <Cell key={index} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Orders by Status</h2>
          {orderPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={orderPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderPieData.map((entry, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No orders yet</p>
          )}
        </div>

        {/* Top Selling Products (Full Width) */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Top Selling Products</h2>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topProducts} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
                <YAxis tick={{ fill: "#4B5563" }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {topProducts.map((entry, index) => (
                    <Cell key={index} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No products sold yet</p>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-purple-50">
            <tr>
              <th className="py-2 px-4 border-b text-purple-700">User</th>
              <th className="py-2 px-4 border-b text-purple-700">Order ID</th>
              <th className="py-2 px-4 border-b text-purple-700">Total</th>
              <th className="py-2 px-4 border-b text-purple-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-50 transition">
                <td className="py-2 px-4 border-b">{order.userName}</td>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  ₹
                  {order.items?.reduce(
                    (acc, item) => acc + (item.price_at_ordered || item.price || 0) * item.quantity,
                    0
                  ) || 0}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
