import { useState, useContext, createContext } from "react";
import { supabase } from "../lib/supabase";

/* =========================
   取得目前登入使用者
========================= */
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("使用者尚未登入");
  return data.user;
}

/* =========================
   加入購物車
========================= */
export async function addToCartApi({ product_id, variant_id, quantity }) {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("carts")
    .insert({
      user_id: user.id,
      product_id,
      variant_id,
      quantity,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* =========================
   更新商品數量
========================= */
export async function updateCartQuantityApi(id, quantity) {
  const { data, error } = await supabase
    .from("carts")
    .update({ quantity })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* =========================
   刪除單筆商品
========================= */
export async function deleteCartItemApi(id) {
  const { error } = await supabase.from("carts").delete().eq("id", id);
  if (error) throw error;
}

/* =========================
   清空購物車
========================= */
export async function clearCartApi() {
  const user = await getCurrentUser();
  const { error } = await supabase.from("carts").delete().eq("user_id", user.id);
  if (error) throw error;
}

/* =========================
   Cart Context
========================= */
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const user = await getCurrentUser();
      const { data, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setCart(data);
    } catch (error) {
      console.warn("fetchCart:", error.message);
      setCart([]);
    }
  };

  const addToCart = async (payload) => {
    try {
      await addToCartApi(payload);
      await fetchCart();
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}