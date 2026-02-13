import { useState, useContext, createContext } from "react";
import { supabase } from "../lib/supabase";

// 取得購物車
export async function getCartsApi() {
  const { data, error } = await supabase.from("carts").select("*");

  console.log("cartData:", data);
  console.log("error:", error);
  if (error) throw error;
  return data ?? [];
}

// 加入購物車
// export async function addToCartApi({ product_id, variant_id, quantity }) {
//   // 要先登入
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!user) throw new Error("請先登入");

//   const { data, error } = await supabase
//     .from("carts")
//     .insert({
//       user_id: session.user.id,
//       product_id,
//       variant_id,
//       quantity,
//     })
//     .select()
//     .single();

//   if (error) throw error;
//   return data?.[0];
// }
export async function addToCartApi(payload) {
  console.log("假加入購物車:", payload);

  return {
    id: "test123",
    ...payload,
  };
}

// 更新購物車商品數量
export async function updateCartQuantityApi(id, quantity) {
  const { data, error } = await supabase
    .from("carts")
    .update({ quantity })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data?.[0];
}

// 刪除單筆商品
export async function deleteCartItemApi(id) {
  const { error } = await supabase.from("carts").delete().eq("id", id);

  if (error) throw error;
}

// 清空購物車
export async function clearCartApi() {
  const { error } = await supabase
    .from("carts")
    .delete()
    .eq("user_id", user_id);

  if (error) throw error;
}

// 建立 CartContext
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.product_id === product.product_id,
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }

      return [...prev, product];
    });
  };
  // const addToCart = async (payload) => {
  //   await addToCartApi(payload);
  //   fetchCart();
  // };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
