import React, { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import SocialButton from './components/SocialButton';
import InputGroup from './components/InputGroup'; // 引入你剛做好的元件

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
  }; // ✅ 這裡要有關閉的大括號

  return (
    <AuthLayout title="登入 YenMade">
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
              {/* ✅ 使用 InputGroup 元件 */}
              <InputGroup 
                label="電子郵件／手機號碼" 
                name="login_id" 
                placeholder="請輸入 Email／手機號碼" 
                required 
                feedback="請輸入有效的帳號" 
              />

              <div className="col-12">
                <label className="form-label">密碼</label>
                <div className="input-group">
                  <input 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="form-control"
                    placeholder="請輸入密碼" 
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
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
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
              <SocialButton provider="facebook" text="使用 Facebook 登入" />
              <SocialButton provider="line" text="使用 LINE 登入" />
              <SocialButton provider="google" text="使用 Google 登入" />
              <SocialButton provider="apple" text="使用 Apple 登入" />
            </div>
          </div>
        </div>
      </aside> 
    </AuthLayout>
  );
}; // ✅ 元件最後的關閉大括號

export default SignIn;