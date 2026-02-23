// src/api/cartApiDate.jsx
import { useState, useContext, createContext } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

/* =========================
   取得目前登入使用者
========================= */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("使用者尚未登入");
  return data.user;
}

/* =========================
   加入購物車
========================= */
export async function addToCartApi({ product_id, variant_id, quantity, user_id, guest_id }) {
  if (!user_id && !guest_id) {
    guest_id = localStorage.getItem("guest_id");
    if (!guest_id) {
      guest_id = uuidv4();
      localStorage.setItem("guest_id", guest_id);
    }
  }

  const qty = quantity || 1;

  // 1️⃣ 插入購物車
  const { data: insertData, error: insertError } = await supabase
    .from("carts")
    .insert({
      product_id,
      variant_id,
      quantity: qty,
      user_id: user_id || null,
      guest_id: guest_id || null,
    })
    .select(); // select() 可以回傳剛插入的資料

  if (insertError) throw insertError;

  // 2️⃣ 插入後回傳完整購物車
  const fullCart = await fetchCartWithDetails(user_id, guest_id);
  return fullCart;
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
  const user = await getCurrentUser().catch(() => null);
  const guest_id = localStorage.getItem("guest_id");

  if (!user && !guest_id) return;

  const query = supabase.from("carts").delete();
  if (user) query.eq("user_id", user.id);
  else query.eq("guest_id", guest_id);

  const { error } = await query;
  if (error) throw error;
}

/* =========================
   抓完整購物車資訊（join products & variants）
========================= */
export async function fetchCartWithDetails(user_id, guest_id) {
  let query = supabase
    .from("carts")
    .select(`
      id,
      quantity,
      user_id,
      guest_id,
      product:products!carts_product_id_fkey (
        id,
        title,
        price,
        image_url
      ),
      variant:product_variants!carts_variant_id_fkey (
        id,
        name,
        stock
      )
    `);

  if (user_id) {
    query = query.eq("user_id", user_id);
  } else if (guest_id) {
    query = query.eq("guest_id", guest_id);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

/* =========================
   Cart Context
========================= */
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const user = await getCurrentUser().catch(() => null);
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