import React from 'react';
import { Link } from 'react-router-dom'; // 假設你有用 react-router
import logoImg from './assets/images/logo/Type=Logo_Horizontal.svg';

const OrderSuccess = () => {
  return (
    <main className="auth-page-wrapper vh-100 d-flex justify-content-center pt-5">
      <div className="container text-center">
        {/* Logo 區塊 */}
        <div className="mb-5">
          <img src={logoImg} alt="YenMade 醃造所" style={{ maxWidth: '200px' }} />
        </div>

        {/* 標題與內文 */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-4" style={{ color: '#4A4A4A' }}>
            謝謝您的購買
          </h1>
          <p className="h4 fw-light mb-2">我們正細心準備</p>
          <p className="h4 fw-light">很快就會送到您手中</p>
        </div>

        {/* 按鈕區塊 */}
        <div className="mb-5">
          <Link to="/orders" className="btn px-4 py-2" style={{ backgroundColor: '#9D8473', color: 'white' }}>
            訂單追蹤
          </Link>
        </div>

        {/* 備註說明 */}
        <p className="small mt-5" style={{ color: '#4A4A4A' }}>
          非會員訂單將以簡訊及信箱通知訂單最新狀態
        </p>
      </div>
    </main>
  );
};

export default OrderSuccess;