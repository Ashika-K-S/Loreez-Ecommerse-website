import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

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

      // Refresh cart
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

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);