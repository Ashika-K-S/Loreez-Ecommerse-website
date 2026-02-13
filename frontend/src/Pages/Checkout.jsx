import React, { useState, useEffect, useMemo } from "react";
import api from "../api/api";
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <div className="min-h-screen mt-24 bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-700">
          Checkout
        </h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
         
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24 h-fit">
            <h2 className="text-2xl font-semibold mb-4">
              Order Summary
            </h2>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">
                      {item.product?.name}
                    </p>
                    <p className="text-gray-500">
                      {item.quantity} × ₹
                      {Number(item.price_at_added).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="font-bold">
                  ₹
                  {(
                    Number(item.price_at_added) *
                    Number(item.quantity)
                  ).toLocaleString()}
                </p>
              </div>
            ))}

            <div className="text-right font-bold text-xl mt-4">
              Total: ₹{totalPrice.toLocaleString()}
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Shipping & Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />

              <textarea
                placeholder="Delivery Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                rows={4}
                required
              />

              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentMethod: e.target.value,
                  })
                }
                className="w-full border px-4 py-2 rounded"
              >
                <option>Cash on Delivery</option>
                <option>UPI Payment</option>
                <option>Debit/Credit Card</option>
                <option>Net Banking</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'} text-white py-3 rounded font-semibold transition`}
              >
                {loading ? "Processing..." : `Place Order ₹${totalPrice.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

