import React, { useState, useEffect, useMemo } from "react";
import api from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStore } from "../Context/StoreContext";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useStore();
  const [loading, setLoading] = useState(false);

  
  const items = location.state?.items || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      return (
        acc +
        Number(item.price_at_added || 0) *
          Number(item.quantity || 0)
      );
    }, 0);
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("orders/checkout/", {
        shipping_address: formData.address,
        payment_method: formData.paymentMethod,
        phone: formData.phone,
      });

      toast.success(
        `Order placed successfully! Total: ₹${totalPrice.toLocaleString()}`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );

      if (clearCart) clearCart();

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "Cash on Delivery",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error(err.response?.data?.detail || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <p className="text-center text-gray-600 text-lg">
            No items in your cart to checkout.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-24 bg-stone-50 font-sans">
        <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-center mb-12 text-gray-900 uppercase">
          Secure Checkout
        </h1>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Shipping & Payment Form (Left on Desktop, Top on Mobile) */}
          <div className="md:col-span-7 lg:col-span-8 order-2 md:order-1">
            <h2 className="text-lg font-serif tracking-widest uppercase mb-8 pb-4 border-b border-stone-200">
              Delivery Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors placeholder-stone-300"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors placeholder-stone-300"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors placeholder-stone-300"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Shipping Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors resize-none placeholder-stone-300"
                  placeholder="Full street address, city, postal code"
                  rows={3}
                  required
                />
              </div>

              <div className="pt-6">
                <h2 className="text-lg font-serif tracking-widest uppercase mb-6 pb-4 border-b border-stone-200">
                  Payment Method
                </h2>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-300 py-3 px-2 text-gray-700 focus:outline-none focus:border-gray-900 transition-colors uppercase tracking-wider text-sm cursor-pointer"
                >
                  <option>Cash on Delivery</option>
                  <option>UPI Payment</option>
                  <option>Debit/Credit Card</option>
                  <option>Net Banking</option>
                </select>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                    loading ? 'bg-stone-300 text-stone-500 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {loading ? "Processing..." : `Complete Purchase • ₹${totalPrice.toLocaleString()}`}
                </button>
                <p className="text-center text-xs text-stone-400 mt-4 font-light tracking-wide">
                  Your personal data will be used to process your order and support your experience throughout this website.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar (Right on Desktop, Bottom on Mobile) */}
          <div className="md:col-span-5 lg:col-span-4 order-1 md:order-2 mb-12 md:mb-0">
            <div className="bg-white border border-stone-200 p-8 sticky top-32">
              <h2 className="text-lg font-serif tracking-widest uppercase mb-8 pb-4 border-b border-stone-200">
                Order Summary
              </h2>

              <div className="space-y-6 mb-8 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-20 bg-stone-100 shrink-0 overflow-hidden">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-serif text-sm text-gray-900 leading-snug mb-1">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center text-right">
                      <p className="font-light text-sm text-gray-900">
                        ₹{(Number(item.price_at_added) * Number(item.quantity)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="uppercase tracking-widest text-xs">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="uppercase tracking-widest text-xs">Shipping</span>
                  <span className="text-stone-400">Complimentary</span>
                </div>
                <div className="flex justify-between items-center border-t border-stone-200 pt-6 mt-6">
                  <span className="font-serif text-lg text-gray-900 uppercase tracking-widest">Total</span>
                  <span className="font-serif text-xl text-gray-900">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

