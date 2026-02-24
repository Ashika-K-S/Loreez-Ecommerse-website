import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext"; 
import { useStore } from "../Context/StoreContext";

const OrderPage = () => {
  const { cart, setCart } = useStore();
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);
  
  const fetchUserOrders = async () => {
    if (!user) return;
    try {
      const res = await api.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const placeOrder = async () => {
    if (!user) return alert("You must be logged in to place an order.");
    if (cart.length === 0) return alert("Cart is empty");

    try {
      // Use the new checkout endpoint which handles cart to order conversion
      const res = await api.post("/orders/checkout/", {
          shipping_address: "Default Address", // In a real app, this would come from a form
          payment_method: "Cash on Delivery"
      });
      
      setCart([]);
      alert("Order placed successfully!");
      fetchUserOrders(); 
    } catch (err) {
      console.error("Error placing order:", err);
      alert(err.response?.data?.error || "Failed to place order");
    }
  };

  if (!user) return <p className="text-center mt-10">Please log in to see your orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      <button
        onClick={placeOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Place Order
      </button>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-4 mb-2 rounded shadow-sm bg-white">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span className="capitalize text-blue-600">{order.status}</span></p>
            <p><strong>Total:</strong> ₹{Number(order.total_amount).toLocaleString()}</p>
            <p className="mt-2"><strong>Items:</strong></p>
            <ul className="list-disc ml-6">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.product_name} x {item.quantity} (₹{Number(item.price).toLocaleString()})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
