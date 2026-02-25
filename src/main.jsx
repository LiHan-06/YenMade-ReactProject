import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider } from "./context/AuthContext";

// 1. 先引入基礎樣式
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./index.css";

// 2. 再引入你的全域 SCSS (這樣你的自訂顏色才能蓋過 Bootstrap)
import "./assets/scss/all.scss";

// 3. 最後引入組件
import { CartProvider } from "./api/cartApiDate";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
