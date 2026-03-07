import { useState, useContext, createContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import {
  addToCartApi,
  updateCartQuantityApi,
  deleteCartItemApi,
  clearCartApi,
  fetchCartWithDetails,
} from "../api/carts";

/* =========================
   Cart Context
========================= */
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // 登入後 merge guest cart
  const mergeGuestCart = async () => {
    const guest_id = localStorage.getItem("guest_id");
    if (user && guest_id) {
      await supabase
        .from("carts")
        .update({ user_id: user.id, guest_id: null })
        .eq("guest_id", guest_id);
      localStorage.removeItem("guest_id");
    }
  };

  const fetchCart = async () => {
    try {
      await mergeGuestCart();
      const guest_id = localStorage.getItem("guest_id");
      const data = await fetchCartWithDetails(user?.id, guest_id);
      setCart(data);
    } catch (error) {
      console.error("抓購物車失敗:", error);
    }
  };

  const addToCart = async (payload) => {
    try {
      const updatedCart = await addToCartApi(payload);
      setCart(updatedCart);
    } catch (error) {
      console.error("加入購物車失敗:", error.message);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await updateCartQuantityApi(id, quantity);
      await fetchCart();
    } catch (error) {
      console.error("更新數量失敗:", error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItemApi(id);
      await fetchCart();
    } catch (error) {
      console.error("刪除商品失敗:", error.message);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setCart([]);
    } catch (error) {
      console.error("清空購物車失敗:", error.message);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (Number(item.product?.price) || 0) * Number(item.quantity),
    0,
  );
  const deliveryFee = 300;

  // 初始抓購物車
  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalPrice,
        deliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
