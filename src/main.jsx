import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./assets/scss/all.scss";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 元件首頁用 */}
    <Header variant="home" />
    {/* 其他頁面使用 */}
    <Header />
    <Footer />
  </StrictMode>,
);
