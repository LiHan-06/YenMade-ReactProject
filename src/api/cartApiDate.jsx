import { useState, useContext, createContext } from "react";
import { supabase } from "../lib/supabase";

// 取得購物車
export async function getCartsApi(user_id) {
  const { data, error } = await supabase
    .from("carts")
    .select(
      `
      *,
      product:products (*),
      variant:product_variants (*)
    `,
    )
    .eq("user_id", user_id);

  if (error) throw error;
  return data || [];
}

// 加入購物車
export async function addToCartApi({
  user_id,
  guest_id,
  product_id,
  variant_id,
  quantity,
}) {
  // 要先登入
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.log("請先登入！");
    return;
  }

  const { data, error } = await supabase
    .from("carts")
    .insert({
      user_id,
      guest_id,
      product_id,
      variant_id,
      quantity,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 更新購物車商品數量
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

// 刪除單筆商品
export async function deleteCartItemApi(id) {
  const { error } = await supabase.from("carts").delete().eq("id", id);

  if (error) throw error;
}

// 清空購物車
export async function clearCartApi(user_id) {
  // if (!user_id) return;
  const { error } = await supabase
    .from("carts")
    .delete()
    .eq("user_id", user_id);
  console.log("執行清空購物車");
  getCartsApi();
  if (error) throw error;
}

// 建立 CartContext
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async (user_id) => {
    console.log("取得 user_id 的購物車", user_id);
    try {
      const cartData = await getCartsApi(user_id);
      setCart(cartData || []);
    } catch (error) {
      console.error("抓取購物車失敗:", error.message);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.variant_id === product.variant_id,
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.variant_id === product.variant_id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
