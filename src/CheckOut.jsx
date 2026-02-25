import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";
import { useNavigate } from "react-router";

import { Outlet } from "react-router";

function CheckOut() {
  // 使用購物車先登入
  const navigate = useNavigate(); // ✅ 初始化跳轉工具
  const [userId, setUserId] = useState(null);

  // 將 User ID 存入狀態（State）。
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();
  //     // 驗證
  //     if (authError || !user) {
  //       console.log("請先登入！");
  //       navigate("/signin");
  //     } else {
  //       console.log("已登入！");
  //       setUserId(user.id);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  return (
    <main className="container pt-8">
      <h1 className="text-center">購物車</h1>
      <Outlet userId={userId} />
    </main>
  );
}

export default CheckOut;
