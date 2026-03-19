import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import SocialButton from "./components/SocialButton";
import InputGroup from "./components/InputGroup";
import { signIn } from "./api/auth";
import { Link } from "react-router";

// ✅ 1. 引入 Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
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
    const email = formData.get("login_id");
    const password = formData.get("password");

    try {
      const userData = await signIn(email, password);
      localStorage.setItem("user_info", JSON.stringify(userData));

      // ✅ 2. 登入成功吐司
      toast.success("歡迎回來！登入成功 ✨", {
        position: "top-right",
        autoClose: 1500,
      });

      // 稍微延遲跳轉，讓使用者看得到吐司
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      // ✅ 3. 登入失敗吐司
      toast.error(`登入失敗：${error.message || "帳號或密碼錯誤"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="登入 YenMade">
      {/* ✅ 4. 放置 Toast 容器 */}
      <ToastContainer />

      <section className="col-lg-6">
        <div className="card brand-card h-100">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-3">一般登入</h3>

            <form
              className={`row g-3 ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
            >
              <InputGroup
                label="電子郵件"
                name="login_id"
                type="email"
                placeholder="請輸入 Email"
                required
                feedback="請輸入有效的 Email"
              />

              <div className="col-12">
                <label className="form-label" htmlFor="password">
                  密碼
                </label>
                <div className="input-group">
                  <input
                    name="password"
                    id="password"
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
                    {showPassword ? "隱藏" : "顯示"}
                  </button>
                </div>
                <div className="invalid-feedback">請輸入密碼</div>
              </div>

              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    記住帳號
                  </label>
                </div>
                <a href="#" className="link-secondary small">
                  忘記密碼？
                </a>
              </div>

              <div className="col-12 d-flex gap-2">
                <button
                  className="btn btn-color flex-fill"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "登入中..." : "登入"}
                </button>
                <Link
                  className="btn btn-outline-secondary flex-fill"
                  to="/signUp"
                >
                  註冊
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

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
};

export default SignIn;