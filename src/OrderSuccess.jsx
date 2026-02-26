import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from './assets/images/logo/Type=Logo_Horizontal.svg';
import orderSuccessImg from './assets/images/checkOut/ordersuccess.png';
import orderSuccessImg2 from './assets/images/checkOut/ordersuccess-2.png';

const OrderSuccess = () => {
  return (
    <div className="pb-5">
      {/* 流程圖區塊 */}
      <div className="container-fluid px-3 px-md-0 mt-4 mt-md-5">
        <picture>
          {/* ✅ 當螢幕寬度小於 500px 時，顯示 OrderSuccess2.jpg */}
          <source srcSet={orderSuccessImg2} media="(max-width: 500px)" />
          
          {/* ✅ 預設（大於 500px）顯示原本的 OrderSuccess.jpg */}
          <img 
            src={orderSuccessImg} 
            alt="流程圖" 
            className="d-block mx-auto" 
            style={{ maxWidth: '976px', width: '100%', height: 'auto' }}
          />
        </picture>
      </div>
    
      {/* 移除 vh-100 改用 min-vh-50，避免手機版內容被強制拉長或切掉 */}
      <main className="auth-page-wrapper d-flex justify-content-center pt-4 pt-md-5">
        <div className="container text-center px-4">
          
          {/* Logo 區塊：手機版縮小一點 */}
          <div className="mb-4 mb-md-5">
            <img 
              src={logoImg} 
              alt="YenMade 醃造所" 
              className="img-fluid" 
              style={{ maxWidth: '160px' }} // 桌機維持 200px 在下方 md 調整
            />
          </div>

          {/* 標題與內文：使用響應式字體大小 */}
          <div className="mb-4 mb-md-5">
            <h1 className="fw-bold mb-3 mb-md-4" style={{ color: '#4A4A4A', fontSize: 'calc(1.375rem + 1.5vw)' }}>
              謝謝您的購買
            </h1>
            <p className="h5 h4-md fw-light mb-2">我們正細心準備</p>
            <p className="h5 h4-md fw-light">很快就會送到您手中</p>
          </div>

          {/* 按鈕區塊：手機版寬度稍微增加，比較好按 */}
          <div className="mb-4 mb-md-5">
            <Link 
    to="/"  // ✅ 改為 "/" 回到首頁，或改為你的首頁路由名稱
    className="btn px-5 py-2 fw-bold" 
    style={{ 
      backgroundColor: '#9D8473', 
      color: 'white', 
      borderRadius: '4px',
      fontSize: '1.1rem',
      transition: '0.3s' // 增加一點過渡效果
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#867061'} // 滑鼠移入變深
    onMouseOut={(e) => e.target.style.backgroundColor = '#9D8473'}  // 滑鼠移出恢復
  >
    回首頁逛逛
  </Link>
          </div>

          {/* 備註說明 */}
          <p className="small mt-4 mt-md-5 px-2" style={{ color: '#4A4A4A' }}>
            非會員訂單將以簡訊及信箱通知訂單最新狀態
          </p>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
