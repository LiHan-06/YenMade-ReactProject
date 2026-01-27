import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. 先引入基礎樣式
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'

// 2. 再引入你的全域 SCSS (這樣你的自訂顏色才能蓋過 Bootstrap)
import './assets/scss/all.scss';

// 3. 最後引入組件
import Header from './Header';  
import SignUp from './SignUp.jsx';
import Footer from './Footer';  
import SignIn from './SignIn.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 統一在此管理全域佈局 */}
    <Header />
    <SignUp />
    <Footer />
  </StrictMode>
);