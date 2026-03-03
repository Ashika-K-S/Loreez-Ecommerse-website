import React, { useState, useEffect, useMemo } from "react";
import api from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStore } from "../Context/StoreContext";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51T6pdWF18aOI1ig5eMXycoXR650bPeB8g0YL9ELHhDFKOsCp3F1iXnuqeFplP62BwFa7KsMLp0TK1PXk1I91TA4H00jwnOQiGP");

/* ================= STRIPE PAYMENT COMPONENT ================= */

function StripePayment({ orderId, totalPrice, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent
      const res = await api.post(`/payments/create/${orderId}/`);
      const { clientSecret } = res.data;

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ Verify on backend
      if (result.paymentIntent.status === "succeeded") {
        await api.post("/payments/verify/", {
          payment_intent_id: result.paymentIntent.id,
        });

        toast.success("Payment Successful!");
        onSuccess();
      }

    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="mt-8">
      <div className="border p-4 bg-white mb-6">
        <CardElement />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-black text-white py-4 uppercase tracking-widest"
      >
        {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
      </button>
    </div>
  );
}

/* ================= MAIN CHECKOUT PAGE ================= */

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useStore();

  const items = location.state?.items || [];

  const [loading, setLoading] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

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
      return acc +
        Number(item.price_at_added || 0) *
        Number(item.quantity || 0);
    }, 0);
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("orders/checkout/", {
        shipping_address: formData.address,
        payment_method: formData.paymentMethod,
        phone: formData.phone,
      });

      const order = res.data;

      // If Card selected → show Stripe UI
      if (formData.paymentMethod === "Debit/Credit Card") {
        setCreatedOrderId(order.id);
        setLoading(false);
        return;
      }

      // COD flow
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Checkout failed");
    }

    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>No items in cart.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-32 pb-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE FORM */}
          <div>
            <h2 className="text-2xl mb-6 uppercase">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full border p-3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full border p-3"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Phone"
                required
                className="w-full border p-3"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Shipping Address"
                required
                className="w-full border p-3"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <select
                className="w-full border p-3"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                <option>Cash on Delivery</option>
                <option>Debit/Credit Card</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 uppercase"
              >
                {loading ? "Processing..." : `Place Order • ₹${totalPrice.toLocaleString()}`}
              </button>
            </form>

            {/* STRIPE SECTION */}
            {createdOrderId &&
              formData.paymentMethod === "Debit/Credit Card" && (
                <Elements stripe={stripePromise}>
                  <StripePayment
                    orderId={createdOrderId}
                    totalPrice={totalPrice}
                    onSuccess={() => {
                      clearCart();
                      navigate("/");
                    }}
                  />
                </Elements>
              )}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="bg-white p-6 border">
            <h3 className="text-xl mb-6">Order Summary</h3>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <span>{item.product?.name} × {item.quantity}</span>
                <span>
                  ₹{(
                    Number(item.price_at_added) *
                    Number(item.quantity)
                  ).toLocaleString()}
                </span>
              </div>
            ))}

            <hr className="my-6" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}