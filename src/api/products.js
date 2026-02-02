import { supabase } from "../lib/supabase";

export async function getProductsApi() {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(id,name,price,stock)");

  if (error) throw error;
  return data || []; // 直接回陣列
}
