import { supabase } from "../lib/supabase";

// 取得可用優惠券
export async function getCouponsApi() {
  try {
    const { data, error } = await supabase
      .from("coupons") // 指定資料表名稱
      .select("*") // 選取所有欄位
      .eq("is_active", true); // 通常只抓取啟用的優惠券（選用）
    // .order("created_at", { ascending: false }); // 依時間排序（選用）

    if (error) {
      console.error("取得優惠券失敗:", error.message);
      return null;
    }

    console.log("優惠券列表:", data);
    return data;
  } catch (error) {
    console.error("發生錯誤:", error);
  }
}

// 套用優惠券
export async function applyCouponApi({ user_id, coupon_code }) {
  try {
    const { data, error } = await supabase.functions.invoke("coupons", {
      user_id,
      coupon_code,
    });
    if (error) {
      console.error("套用優惠券失敗", error);
      return 0;
    }
    const discountAmount = data.discount_amount || 0;
    console.log("成功套用優惠券", discountAmount);
    return discountAmount;
  } catch (error) {
    console.error("套用優惠券失敗", error);
    return 0;
  }
}
