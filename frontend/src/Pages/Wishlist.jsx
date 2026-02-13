import React from "react";
import { useStore } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useStore();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBuyNow = (wishlistItem) => {
    if (!user) {
      toast.error("Login first");
      return;
    }

    // Convert wishlist item → cart-like item
    navigate("/checkout", {
      state: {
        items: [
          {
            id: wishlistItem.id,
            product: wishlistItem.product,
            price_at_added: wishlistItem.product.price,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">
            No items in wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-full h-40 object-cover rounded"
                />

                <h2 className="mt-2 font-semibold text-lg">
                  {item.product?.name}
                </h2>

                <p className="text-yellow-600 font-bold">
                  ₹{Number(item.product?.price || 0).toLocaleString()}
                </p>

                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => addToCart(item.product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
