import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setCart([]);
        setWishlist([]);
        return;
      }

      try {
        const cartRes = await api.get("cart/");
        const wishlistRes = await api.get("wishlist/");

        setCart(cartRes.data.items || []);
        setWishlist(wishlistRes.data || []);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [user]);

 
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Login first");
      navigate("/login");
      return;
    }

    try {
      await api.post("cart/add/", {
        product_id: product.id,
        quantity: 1,
      });

      const res = await api.get("cart/");
      setCart(res.data.items || []);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  
  const removeFromCart = async (id) => {
    if (!user) return;

    try {
      await api.delete(`cart/item/${id}/`);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };


  const updateQuantity = async (id, quantity) => {
    if (!user || quantity < 1) return;

    try {
      await api.put(`cart/item/${id}/`, { quantity });
      const res = await api.get("cart/");
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };


  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Login first");
      return;
    }

    try {
      const exists = wishlist.find(
        (item) => item.product?.id === product.id
      );

      if (exists) {
        await api.delete(`wishlist/${exists.id}/`);
        setWishlist((prev) =>
          prev.filter((item) => item.id !== exists.id)
        );
        toast("Removed from wishlist");
      } else {
        await api.post("wishlist/", { product_id: product.id });
        const res = await api.get("wishlist/");
        setWishlist(res.data || []);
        toast("Added to wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };


  const removeFromWishlist = async (id) => {
    if (!user) return;

    try {
      await api.delete(`/wishlist/${id}/`);
      setWishlist((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

 
  const clearCart = async () => {
    if (!user) return;

    try {
      await api.delete("/cart/");
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        removeFromWishlist,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
