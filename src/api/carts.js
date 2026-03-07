import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

/* =========================
   取得目前登入使用者 (內部輔助用)
========================= */
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/* =========================
   1. 抓取完整購物車資訊 (含關聯產品與規格)
========================= */
export async function fetchCartWithDetails(user_id, guest_id) {
  let query = supabase.from("carts").select(`
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
  } else {
    // 如果兩者都沒有，直接回傳空陣列避免抓到全部人的資料
    return [];
  }

  const { data, error } = await query;
  if (error) {
    // console.error("fetchCartWithDetails Error:", error);
    throw error;
  }
  return data;
}

/* =========================
   2. 加入購物車
========================= */
export async function addToCartApi({ product_id, variant_id, quantity = 1 }) {
  const user = await getCurrentUser();
  let guest_id = null;

  // 若未登入，處理訪客 ID
  if (!user) {
    guest_id = localStorage.getItem("guest_id") || uuidv4();
    localStorage.setItem("guest_id", guest_id);
  }

  const { error: insertError } = await supabase
    .from("carts")
    .insert({
      product_id,
      variant_id,
      quantity: quantity,
      user_id: user?.id || null,
      guest_id: user ? null : guest_id, // 登入後就不應有 guest_id
    });

  if (insertError) throw insertError;
  
  // 回傳最新狀態
  return await fetchCartWithDetails(user?.id, guest_id);
}

/* =========================
   3. 更新商品數量
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
   4. 刪除單筆商品
========================= */
export async function deleteCartItemApi(id) {
  const { error } = await supabase
    .from("carts")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
}

/* =========================
   5. 清空購物車
========================= */
export async function clearCartApi() {
  const user = await getCurrentUser();
  const guest_id = localStorage.getItem("guest_id");

  if (!user && !guest_id) return;

  const query = supabase.from("carts").delete();
  
  if (user) {
    query.eq("user_id", user.id);
  } else {
    query.eq("guest_id", guest_id);
  }

  const { error } = await query;
  if (error) throw error;
}