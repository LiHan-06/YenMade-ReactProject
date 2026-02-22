// api/getCoupons.js
import { supabase } from "../lib/supabase";

// 取得可用優惠券
export async function getCouponsApi() {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("is_active", true) // 只抓啟用的優惠券
      .order("start_date", { ascending: false }); // 用 start_date 排序

    if (error) {
      console.error("取得優惠券失敗:", error.message);
      return [];
    }
    // console.log("可用優惠券列表:", data);
    return data;
  } catch (error) {
    // console.error("取得優惠券發生錯誤:", error);
    return [];
  }
}

// 套用優惠券
export async function applyCouponApi({ user_id, coupon_code }) {
  try {
    const { data, error } = await supabase.functions.invoke(
      "clever-action",
      {
        body: { user_id, coupon_code },
      }
    );

    if (error) {
      // console.error("套用優惠券失敗:", error.message);
      return 0;
    }

    if (!data || !data.discount_amount) {
      return 0;
    }

    return data.discount_amount;
  } catch (err) {
    // console.error("套用優惠券發生錯誤:", err);
    return 0;
  }
}