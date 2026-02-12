import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// 1. 先引入基礎樣式
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import OrderReview from "./OrderReview.jsx";

// 2. 再引入你的全域 SCSS (這樣你的自訂顏色才能蓋過 Bootstrap)
import "./assets/scss/all.scss";

// 3. 最後引入組件
import Header from "./Header";
import SignUp from "./SignUp.jsx";
import Footer from "./Footer";
import SignIn from "./SignIn.jsx";
import OrderSuccess from "./OrderSuccess.jsx";
import AProduct from "./AProduct.jsx";
import CheckOut from "./CheckOut.jsx";
import AllProducts from "./AllProducts.jsx";
// import CartStepOne from "./CartStepOne.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 統一在此管理全域佈局 */}
    <BrowserRouter>
      {/* <Header variant="home" /> */}
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
