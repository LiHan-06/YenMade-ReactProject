// 註冊頁
import React, { useState } from 'react';
import logoImg from './assets/images/logo/Type=Logo_Horizontal.svg';
import AuthLayout from './components/AuthLayout';
import InputGroup from './components/InputGroup';
import SocialButton from './components/SocialButton';

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
          <AuthLayout title="加入 YenMade">
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
                {/* ✅ 使用 InputGroup 元件簡化代碼 */}
              <InputGroup label="姓名" name="full_name" placeholder="請輸入姓名" required feedback="請填寫姓名" />
              <InputGroup label="手機號碼" name="phone" type="tel" placeholder="請輸入手機" pattern="[0-9+\-\s]{8,}" required feedback="請輸入有效手機號碼" />
              <InputGroup label="電子郵件" name="email" type="email" placeholder="請輸入 Email" required feedback="請輸入有效 Email" />

              {/* ✅ 密碼欄位：手動撰寫以保留切換顯示邏輯 */}
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

              {/* ✅ 再次確認密碼 */}
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

              <div className="col-12 mt-4">
                <button className="btn btn-color btn-lg w-100" type="submit">註冊</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <aside className="col-lg-6">
        <div className="card brand-card h-100">
          <div className="card-body">
            <h3 className="h5 text-center fw-semibold mb-5">社群註冊</h3>
            <div className="vstack social-list">
              <SocialButton provider="facebook" text="使用 Facebook 註冊" />
              <SocialButton provider="line" text="使用 LINE 註冊" />
              <SocialButton provider="google" text="使用 Google 註冊" />
              <SocialButton provider="apple" text="使用 Apple 註冊" />
            </div>
          </div>
        </div>
      </aside>
    </AuthLayout>
  );
};

export default SignUp;