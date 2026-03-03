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

  const handleBuyNow = async (wishlistItem) => {
    if (!user) {
      toast.error("Login first");
      return;
    }

    // Add to cart first so backend can process checkout
    await addToCart(wishlistItem.product);

    // Convert wishlist item → cart-like item (matches CartItem serializer)
    navigate("/checkout", {
      state: {
        items: [
          {
            id: wishlistItem.id, // using wishlistItem id as a temporary item id
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
      <div className="min-h-screen pt-32 pb-24 px-6 bg-stone-50 font-sans">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-center mb-16 text-gray-900 uppercase">
            Your Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 border-y border-stone-200">
              <p className="text-stone-500 font-light mb-8">Your curated collection is currently empty.</p>
              <button 
                onClick={() => navigate('/products')}
                className="border-b border-gray-900 pb-1 text-sm tracking-widest uppercase font-medium hover:text-gray-500 transition-colors"
              >
                Discover Pieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {wishlist.map((item) => (
                <div key={item.id} className="group flex flex-col cursor-pointer">
                  <div className="relative overflow-hidden bg-white mb-4">
                    
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      onClick={() => navigate(`/product/${item.product?.id}`)}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.id);
                      }}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><line x1="18" y1="2" x2="22" y2="6"></line><line x1="22" y1="2" x2="18" y2="6"></line></svg>
                    </button>

                    {/* Quick Add Buttons Overlay */}
                    <div className="absolute left-0 bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item.product);
                        }}
                        className="flex-1 bg-white text-gray-900 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(item);
                        }}
                        className="flex-1 bg-gray-900 text-white py-3 text-sm font-medium uppercase tracking-wider hover:bg-black transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                 
                  <div className="text-center px-2">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      {item.product?.category_name}
                    </p>
                    <h2 
                      onClick={() => navigate(`/product/${item.product?.id}`)}
                      className="text-lg font-serif text-gray-900 mb-1 leading-snug hover:text-stone-500 transition-colors"
                    >
                      {item.product?.name}
                    </h2>
                    <p className="text-gray-600 font-medium tracking-wide">
                      ₹{Number(item.product?.price || 0).toLocaleString()}
                    </p>
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

export default Wishlist;
