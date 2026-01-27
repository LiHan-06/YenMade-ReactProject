//登入頁
import React, { useState } from 'react';
import logoImg from './assets/images/logo/Type=Logo_Horizontal.svg';
// 導入同事做好的共用元件
//import Header from './Header'; 
//import Footer from './Footer';

// 子元件：社群登入按鈕
const SocialButton = ({ icon, text, provider }) => {
  const handleSocialLogin = (e) => {
    e.preventDefault();
    // 導向後端驗證路徑
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
        {icon}
        {text}
      </span>
      <span className="btn-social__chevron" aria-hidden="true">›</span>
    </a>
  );
};

const SignIn = () => {
  // 狀態管理
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  // 表單送出處理
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>

      <main className="auth-page-wrapper">
        <div className="container-md py-4 auth-page login-page mb-80">
          <img src={logoImg} className="d-block mx-auto mb-4" alt="logo"  />
          <h2 className="text-center fw-semibold mb-4">
            登入 YenMade<br className="d-lg-none" /> 醃造所
          </h2>

          <div className="row g-4 auth-columns ">
            {/* 左：一般登入 */}
            <section className="col-lg-6">
              <div className="card brand-card h-100">
                <div className="card-body">
                  <h3 className="h5 fw-semibold mb-3">一般登入</h3>

                  <form 
                    id="loginForm" 
                    className={`row g-3 ${validated ? 'was-validated' : ''}`} 
                    noValidate 
                    onSubmit={handleSubmit}
                  >
                    <div className="col-12">
                      <label htmlFor="loginId" className="form-label">電子郵件／手機號碼</label>
                      <input 
                        id="loginId" 
                        name="login_id" 
                        type="text" 
                        className="form-control"
                        placeholder="請輸入 Email／手機號碼" 
                        autoComplete="username"
                        inputMode="email" 
                        required 
                      />
                      <div className="form-text">可輸入 Email 或手機號碼</div>
                      <div className="invalid-feedback">請輸入有效的帳號</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="loginPwd" className="form-label">密碼</label>
                      <div className="input-group">
                        <input 
                          id="loginPwd" 
                          name="password" 
                          type={showPassword ? "text" : "password"} 
                          className="form-control"
                          placeholder="請輸入密碼" 
                          autoComplete="current-password" 
                          required 
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? '隱藏' : '顯示'}
                        </button>
                      </div>
                      <div className="invalid-feedback">請輸入密碼</div>
                    </div>

                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="yes" id="rememberMe" name="remember_me" />
                        <label className="form-check-label" htmlFor="rememberMe">記住帳號</label>
                      </div>
                      <a href="#" className="link-secondary small">忘記密碼？</a>
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button className="btn btn-color flex-fill" type="submit">登入</button>
                      <a className="btn btn-outline-secondary flex-fill" href="/signup">註冊</a>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* 右：社群登入 */}
            <aside className="col-lg-6">
              <div className="card brand-card h-100">
                <div className="card-body">
                  <h3 className="h5 fw-semibold mb-3">社群登入</h3>

                  <div className="vstack social-list">
                    <SocialButton 
                      provider="facebook"
                      text="使用 Facebook 登入"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.9.16 1.9.16v2.1h-1.1c-1 0-1.3.63-1.3 1.3V12h2.3l-.37 3h-1.93v7A10 10 0 0 0 22 12"/>
                        </svg>
                      }
                    />
                    
                    <SocialButton 
                      provider="line"
                      text="使用 LINE 登入"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M19 3H5a4 4 0 0 0-4 4v6a7 7 0 0 0 7 7h1v1a1 1 0 0 0 1.6.8L14 20h5a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"/>
                        </svg>
                      }
                    />

                    <SocialButton 
                      provider="google"
                      text="使用 Google 登入"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M21.35 11.1h-9.18v2.96h5.28a4.53 4.53 0 0 1-1.96 2.96a6.5 6.5 0 1 1 0-10.04l2.09-2.05A9.5 9.5 0 1 0 12 21.5c5 0 9-3.5 9.35-8.4Z"/>
                        </svg>
                      }
                    />

                    <SocialButton 
                      provider="apple"
                      text="使用 Apple 登入"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M16.36 1.64A5 5 0 0 1 14 6a5 5 0 0 1 2.36-4.36ZM12 7.5c1.42 0 2.7.82 3.29.82c.55 0 1.86-.88 3.47-.83a3.9 3.9 0 0 1 3.22 1.7c-2.82 1.74-2.36 6.12.45 7.38a9.1 9.1 0 0 1-2.3 3.58c-.93.99-2 2.06-3.5 2.08c-1.31.02-1.73-.62-3.23-.62c-1.5 0-1.96.6-3.22.64c-1.35.04-2.38-1.09-3.31-2.06C4.23 18.2 2.38 13.58 4.8 10.2A4.7 4.7 0 0 1 8.7 8c1.46 0 2.38.82 3.3.82Z"/>
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;