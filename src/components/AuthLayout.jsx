import React from 'react';
import logoImg from '../assets/images/logo/Type=Logo_Horizontal.svg'; // 確保路徑正確

const AuthLayout = ({ title, children }) => {
  return (
    <main className="auth-page-wrapper">
      <div className="container-md py-4 auth-page mb-80">
        {/* 這裡是共同的 Logo */}
        <img src={logoImg} className="d-block mx-auto mb-4" alt="logo" />
        
        {/* 這裡是動態的標題（登入或註冊） */}
        <h2 className="text-center fw-semibold mb-4">
          {title}<br className="d-lg-none" /> 醃造所
        </h2>

        {/* 這裡的 children 會裝下你傳進來的登入表單或註冊表單 */}
        <div className="row g-4 auth-columns">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;