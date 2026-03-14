import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 新增：用來跳轉頁面
import AuthLayout from "./components/AuthLayout";
import SocialButton from "./components/SocialButton";
import InputGroup from "./components/InputGroup";
import { signIn } from "./api/auth"; // ✅ 新增：引入你寫好的 API
import { Link } from "react-router";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ 新增：控制讀取中狀態
  const navigate = useNavigate(); // ✅ 初始化跳轉工具

  // ✅ 升級為 async 函式
  const handleSubmit = async (event) => {
    event.preventDefault(); // 先攔截預設行為
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true); // ✅ 開始讀取

    // 取得資料
    const formData = new FormData(form);
    const email = formData.get("login_id");
    const password = formData.get("password");

    try {
      // ✅ 執行登入並接收回傳的使用者資料 (測試帳號 ym2026@gmail.com / ym123456)
      const userData = await signIn(email, password);

      // 將使用者資料存入 localStorage (轉為字串)
      localStorage.setItem("user_info", JSON.stringify(userData));

      // console.log(userData);

      alert("登入成功！");
      navigate("/"); // ✅ 成功後跳轉回首頁
    } catch (error) {
      // ✅ 處理錯誤訊息 (例如帳密錯誤)
      alert("登入失敗：" + error.message);
    } finally {
      setLoading(false); // ✅ 結束讀取
    }
  };

  return (
    <AuthLayout title="登入 YenMade">
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
                type="email" // 指定 email 格式
                placeholder="請輸入 Email"
                required
                feedback="請輸入有效的 Email"
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
                {/* ✅ 登入中時禁用按鈕，防止重複點擊 */}
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
