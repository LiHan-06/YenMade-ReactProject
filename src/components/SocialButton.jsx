import React from 'react';

// 定義各個社群平台的圖標 SVG
const icons = {
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.9.16 1.9.16v2.1h-1.1c-1 0-1.3.63-1.3 1.3V12h2.3l-.37 3h-1.93v7A10 10 0 0 0 22 12"/>
    </svg>
  ),
  line: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M19 3H5a4 4 0 0 0-4 4v6a7 7 0 0 0 7 7h1v1a1 1 0 0 0 1.6.8L14 20h5a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"/>
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M21.35 11.1h-9.18v2.96h5.28a4.53 4.53 0 0 1-1.96 2.96a6.5 6.5 0 1 1 0-10.04l2.09-2.05A9.5 9.5 0 1 0 12 21.5c5 0 9-3.5 9.35-8.4Z"/>
    </svg>
  ),
  apple: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M16.36 1.64A5 5 0 0 1 14 6a5 5 0 0 1 2.36-4.36ZM12 7.5c1.42 0 2.7.82 3.29.82c.55 0 1.86-.88 3.47-.83a3.9 3.9 0 0 1 3.22 1.7c-2.82 1.74-2.36 6.12.45 7.38a9.1 9.1 0 0 1-2.3 3.58c-.93.99-2 2.06-3.5 2.08c-1.31.02-1.73-.62-3.23-.62c-1.5 0-1.96.6-3.22.64c-1.35.04-2.38-1.09-3.31-2.06C4.23 18.2 2.38 13.58 4.8 10.2A4.7 4.7 0 0 1 8.7 8c1.46 0 2.38.82 3.3.82Z"/>
    </svg>
  )
};

const SocialButton = ({ provider, text }) => {
  const handleSocialLogin = (e) => {
    e.preventDefault();
    // 這裡可以串接你的 API 路徑或 Firebase 驗證
    console.log(`正在透過 ${provider} 進行驗證...`);
    window.location.href = `/auth/${provider}`;
  };

  return (
    <a 
      className="btn btn-brand-outline btn-social w-100 mb-2" 
      href="#" 
      role="button" 
      onClick={handleSocialLogin}
    >
      <span className="btn-social__left">
        {icons[provider]} {/* 根據傳入的 provider 自動顯示對應圖標 */}
        <span className="ms-2">{text}</span>
      </span>
      <span className="btn-social__chevron" aria-hidden="true">›</span>
    </a>
  );
};

export default SocialButton;