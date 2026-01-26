import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/scss/all.scss';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Header from './Header';  
import Footer from './Footer';  

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 元件首頁用 */}
    <Header variant="home" />
    {/* 其他頁面使用 */}
    <Header />
    <Footer />
     <SignUp/>
  </StrictMode>,
);