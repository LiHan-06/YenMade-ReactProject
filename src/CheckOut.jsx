import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";
import { useNavigate, useLocation, Outlet } from "react-router";

function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // ✅ 定義路徑與文字的對應關係
  const getStepText = () => {
    const path = location.pathname;
    
    if (path.includes("OrderSuccess")) {
      return "訂單完成";
    } else if (path.includes("OrderReview")) { // 假設這是你的確認訂單頁面路徑
      return "結帳流程（3/3）";
    } else if (path.includes("CartOrderForm")) {
      return "結帳流程（2/3）";
    } else {
      // 預設路徑（通常是 /CheckOut/）
      return "結帳流程（1/3）";
    }
  };

  return (
    <main className="container pt-8">
      {/* ✅ 動態顯示文字 */}
      <h1 className="text-center fw-bold mb-4" style={{ color: '#4A4A4A' }}>
        {getStepText()}
      </h1>
      
      <Outlet userId={userId} 
      context={{
          discountAmount,
          setDiscountAmount,
        }} />
    </main>
  );
}

export default CheckOut;