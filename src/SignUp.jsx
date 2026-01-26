// 註冊頁
import React, { useState } from 'react';

// 子元件：社群註冊按鈕 (增加代碼複用性)
const SocialButton = ({ icon, text, provider }) => {
  const handleSocialRegister = (e) => {
    e.preventDefault();
    // 依後端路由調整，目前與 SignIn 一致
    window.location.href = `/auth/${provider}`;
  };

  return (
    <a 
      className="btn btn-brand-outline btn-social w-100 mb-2" 
      href="#" 
      role="button" 
      onClick={handleSocialRegister}
    >
      <span className="btn-social__left">
        {icon}
        {text}
      </span>
      <span className="btn-social__chevron" aria-hidden="true">›</span>
    </a>
  );
};

const SignUp = () => {
  // 處理表單狀態管理初始化設定
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    password_confirm: ''
  });

  // 處理輸入變更 (為了比對兩次密碼)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 表單送出處理
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isPasswordMatch = formData.password === formData.password_confirm;

    if (form.checkValidity() === false || !isPasswordMatch) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setValidated(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      
      <Header />

      {/*<main className="auth-page-wrapper w-100">*/}
        <main className="auth-page-wrapper w-100 mx-auto">
        <div className="container-md py-4 auth-page signup-page">
          <div className="text-center mb-4">
            <img 
              className="d-block mx-auto mb-4" 
              src="/assets/images/logo/Type=Logo_Horizontal.svg" 
              alt="logo" 
              style={{ maxWidth: '200px' }}
            />
            <h2 className="text-neutral-500 fw-semibold">
              加入 YenMade <br className="d-lg-none" /> 醃造所
            </h2>
          </div>

          <div className="row g-4 auth-columns justify-content-center">
            {/* 左：一般註冊 */}
            <section className="col-lg-6">
              <div className="card brand-card h-100">
                <div className="card-body">
                  <h3 className="h5 text-center fw-semibold mb-3">一般註冊</h3>

                  <form 
                    className={`row g-3 ${validated ? 'was-validated' : ''}`} 
                    noValidate 
                    onSubmit={handleSubmit}
                  >
                    <div className="col-12">
                      <label className="form-label">姓名</label>
                      <input name="full_name" type="text" className="form-control" placeholder="請輸入姓名" required />
                      <div className="invalid-feedback">請填寫姓名</div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">手機號碼</label>
                      <input name="phone" type="tel" className="form-control" placeholder="請輸入手機" pattern="[0-9+\-\s]{8,}" required />
                      <div className="form-text">至少 8 碼</div>
                      <div className="invalid-feedback">請輸入有效手機號碼</div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">電子郵件</label>
                      <input name="email" type="email" className="form-control" placeholder="請輸入 Email" required />
                      <div className="invalid-feedback">請輸入有效 Email</div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">密碼</label>
                      <div className="input-group">
                        <input 
                          name="password" 
                          type={showPassword ? "text" : "password"} 
                          className="form-control"
                          placeholder="請輸入密碼" 
                          minLength="8"
                          onChange={handleChange}
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
                      <div className="invalid-feedback">請輸入至少 8 碼密碼</div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">再次輸入密碼</label>
                      <input 
                        name="password_confirm" 
                        type={showPassword ? "text" : "password"} 
                        className={`form-control ${validated && formData.password !== formData.password_confirm ? 'is-invalid' : ''}`}
                        placeholder="請再次輸入密碼" 
                        onChange={handleChange}
                        required 
                      />
                      <div className="invalid-feedback">
                        {formData.password !== formData.password_confirm ? '兩次密碼需一致' : '請再次輸入密碼'}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="marketing" />
                        <label className="form-check-label" htmlFor="marketing">
                          我願意接收醃造所的最新消息
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-color btn-lg w-100" type="submit">註冊</button>
                    </div>

                    <div className="col-12">
                      <p className="small text-neutral-500 mb-0">
                        註冊即代表你同意本網站之
                        <a href="#" className="link-secondary">服務條款</a>與
                        <a href="#" className="link-secondary">隱私權政策</a>。
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* 右：社群註冊 */}
            <aside className="col-lg-6">
              <div className="card brand-card h-100">
                <div className="card-body">
                  <h3 className="h5 text-center fw-semibold mb-5">社群註冊</h3>
                  <div className="vstack social-list">
                    <SocialButton provider="facebook" text="使用 Facebook 註冊" icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.9.16 1.9.16v2.1h-1.1c-1 0-1.3.63-1.3 1.3V12h2.3l-.37 3h-1.93v7A10 10 0 0 0 22 12"/></svg>} />
                    <SocialButton provider="line" text="使用 LINE 註冊" icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5a4 4 0 0 0-4 4v6a7 7 0 0 0 7 7h1v1a1 1 0 0 0 1.6.8L14 20h5a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"/></svg>} />
                    <SocialButton provider="google" text="使用 Google 註冊" icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.18v2.96h5.28a4.53 4.53 0 0 1-1.96 2.96a6.5 6.5 0 1 1 0-10.04l2.09-2.05A9.5 9.5 0 1 0 12 21.5c5 0 9-3.5 9.35-8.4Z"/></svg>} />
                    <SocialButton provider="apple" text="使用 Apple 註冊" icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16.36 1.64A5 5 0 0 1 14 6a5 5 0 0 1 2.36-4.36ZM12 7.5c1.42 0 2.7.82 3.29.82c.55 0 1.86-.88 3.47-.83a3.9 3.9 0 0 1 3.22 1.7c-2.82 1.74-2.36 6.12.45 7.38a9.1 9.1 0 0 1-2.3 3.58c-.93.99-2 2.06-3.5 2.08c-1.31.02-1.73-.62-3.23-.62c-1.5 0-1.96.6-3.22.64c-1.35.04-2.38-1.09-3.31-2.06C4.23 18.2 2.38 13.58 4.8 10.2A4.7 4.7 0 0 1 8.7 8c1.46 0 2.38.82 3.3.82Z"/></svg>} />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default SignUp;