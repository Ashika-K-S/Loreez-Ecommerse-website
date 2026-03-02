import React, { useEffect, useState } from "react";
import api from "../utils/api";
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

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 pb-24 bg-stone-50 font-sans flex items-center justify-center">
          <p className="text-center text-stone-500 uppercase tracking-widest">Please log in to view your extraordinary acquisitions.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-24 bg-stone-50 font-sans">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-center mb-16 text-gray-900 uppercase">
            Order History
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-20 border-y border-stone-200">
              <p className="text-stone-500 font-light mb-8">You haven't made any purchases yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-stone-200 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-stone-100">
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Order #{order.id}</p>
                      <p className="text-sm text-gray-900 font-medium">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-sm font-medium text-green-700 uppercase tracking-wider">{order.status}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-lg font-serif text-gray-900">₹{Number(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-4">Acquired Pieces</p>
                    <ul className="space-y-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                          <span className="font-serif text-gray-900">{item.product_name} <span className="text-stone-400 font-sans ml-2">× {item.quantity}</span></span>
                          <span className="font-light text-gray-900">₹{Number(item.price).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
