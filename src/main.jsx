import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./views/router";

import { AuthProvider } from "./context/AuthContext";

// JS 插件功能
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./index.css";

import "./assets/scss/all.scss";

import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
