import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import api from "../api/api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // -------------------------
  // FETCH CART
  // -------------------------
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    api
      .get("/cart/")
      .then((res) => {
        const items = res.data?.items || [];
        setCart(items);
      })
      .catch((err) => {
        console.error("Cart fetch error:", err);
      });
  }, [user]);

  // -------------------------
  // FETCH WISHLIST
  // -------------------------
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    api
      .get("/wishlist/")
      .then((res) => {
        setWishlist(res.data || []);
      })
      .catch((err) => {
        console.error("Wishlist fetch error:", err);
      });
  }, [user]);

  // -------------------------
  // ADD TO CART
  // -------------------------
  const addToCart = async (product) => {
    if (!user) {
      toast.info("Login first");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
      });

      toast.success("Added to cart");

      const res = await api.get("/cart/");
      setCart(res.data?.items || []);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Unable to add to cart");
    }
  };

  // -------------------------
  // REMOVE FROM CART
  // -------------------------
  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/item/${itemId}/`);
      setCart((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Unable to remove item");
    }
  };

  // -------------------------
  // UPDATE QUANTITY
  // -------------------------
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/item/${itemId}/`, { quantity });

      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Unable to update quantity");
    }
  };

  // -------------------------
  // ADD TO WISHLIST
  // -------------------------
  const addToWishlist = async (productId) => {
    if (!user) {
      toast.info("Login first");
      navigate("/login");
      return;
    }

    try {
      await api.post("/wishlist/", {
        product: productId,   // IMPORTANT: not product_id
      });

      toast.success("Added to wishlist");

      const res = await api.get("/wishlist/");
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Wishlist add error:", err);
      toast.error("Unable to add to wishlist");
    }
  };

  // -------------------------
  // REMOVE FROM WISHLIST
  // -------------------------
  const removeFromWishlist = async (itemId) => {
    try {
      await api.delete(`/wishlist/${itemId}/`);

      setWishlist((prev) =>
        prev.filter((item) => item.id !== itemId)
      );

      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Wishlist remove error:", err);
      toast.error("Unable to remove from wishlist");
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
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);