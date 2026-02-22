import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import SocialButton from "./components/SocialButton";
import InputGroup from "./components/InputGroup";
import { signUp } from "./api/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");

    try {
      await signUp(email, password, { full_name: fullName });

      alert("註冊成功！");
      navigate("/signin");
    } catch (error) {
      alert("註冊失敗：" + error.message);
      console.error("SignUp error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="加入 YenMade">
      <section className="col-lg-6">
        <div className="card brand-card h-100">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-3">帳號註冊</h3>

            <form
              className={`row g-3 ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
            >
              <InputGroup
                label="真實姓名"
                name="fullName"
                placeholder="請輸入您的姓名"
                required
                feedback="請輸入您的姓名"
              />

              <InputGroup
                label="電子郵件"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                feedback="請輸入有效的 Email 地址"
              />

              <div className="col-12">
                <label className="form-label">設定密碼</label>
                <div className="input-group">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="至少 6 位字元"
                    required
                    minLength="6"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "隱藏" : "顯示"}
                  </button>
                </div>
                <div className="invalid-feedback">
                  密碼長度至少需 6 位
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label className="form-check-label small" htmlFor="terms">
                    我已閱讀並同意{" "}
                    <a href="#">服務條款</a> 與 <a href="#">隱私政策</a>
                  </label>
                  <div className="invalid-feedback">
                    您必須同意條款後才能註冊
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex gap-2">
                <button
                  className="btn btn-color flex-fill"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "註冊中..." : "立即註冊"}
                </button>
                <Link className="btn btn-outline-secondary flex-fill" to="/signin">
                  已有帳號？登入
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <aside className="col-lg-6">
        <div className="card brand-card h-100">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-3">快速註冊</h3>
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