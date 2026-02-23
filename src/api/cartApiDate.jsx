import { useState, useContext, createContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";

/* =========================
   取得目前登入使用者
========================= */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/* =========================
   加入購物車
========================= */
export async function addToCartApi({ product_id, variant_id, quantity }) {
  const user = await getCurrentUser();
  let guest_id = null;

  if (!user) {
    guest_id = localStorage.getItem("guest_id");
    if (!guest_id) {
      guest_id = uuidv4();
      localStorage.setItem("guest_id", guest_id);
    }
  }

  const { data: insertData, error: insertError } = await supabase
    .from("carts")
    .insert({
      product_id,
      variant_id,
      quantity: quantity || 1,
      user_id: user?.id || null,
      guest_id: guest_id,
    })
    .select();

  if (insertError) throw insertError;

  // 回傳最新購物車
  return await fetchCartWithDetails(user?.id, guest_id);
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

  if (user_id) query = query.eq("user_id", user_id);
  else if (guest_id) query = query.eq("guest_id", guest_id);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}