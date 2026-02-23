// header
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { useCart } from "./api/cartApiDate";
// import { useSelector } from "react-redux";

import { useAuth } from "./context/AuthContext";
import { supabase } from "./lib/supabase";

import Logo_Horizontal from "./assets/images/logo/Type=Logo_Horizontal.svg";

// style 對照表
const headerVariant = {
  home: {
    navbar: "fixed-top",
    logo: "svgColor",
    toggler: "icon-dark",
    navLi: "navBorder-dark",
    navLink: "content-dark",
    icon: "content-dark",
  },
  default: {
    navbar: "",
    logo: "svg-dark",
    toggler: "",
    navLi: "border-neutral-600",
    navLink: "text-white text-lg-neutral-600",
    icon: "text-neutral-600",
  },
};

function Header({ variant = "default" }) {
  const style = headerVariant[variant];
  const { user } = useAuth();
  // badge
  // 只要 cart 改變，cartCount 就會重新計算。
  const { cartCount, fetchCart } = useCart();
    useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user]);

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-dark pageScroll py-5 ${style.navbar}`}
      >
        <div className="container px-4">
          <NavLink className="navbar-brand p-0 me-lg-45" to="/">
            <img
              className={`${style.logo} logo-size`}
              src={Logo_Horizontal}
              alt="yenmade's logo"
            />
          </NavLink>
          <button
            className={`navbar-toggler border-0 py-2 ${style.toggler}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i className={`bi bi-list fs-5 ${style.icon}`}></i>
          </button>
          <div
            className="offcanvas offcanvas-end offcanvas-space offcanvas-bg"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            data-bs-scroll="true"
            data-bs-backdrop="false"
          >
            <div className="offcanvas-header px-4 py-5 mb-2">
              <button
                type="button"
                className="btn-close svg-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body px-6 px-md-8 px-lg-0">
              <div className="d-flex flex-column">
                <form
                  className="mb-4 position-relative d-lg-none"
                  role="search"
                >
                  <input
                    className="form-control form-search bg-white-alpha border-0 p-3 text-neutral-600 fs-lg-7"
                    type="search"
                    placeholder="找商品"
                    aria-label="Search"
                  />
                  <button
                    className="btn text-white position-absolute top-50 end-0 translate-middle-y me-3"
                    type="submit"
                  >
                    <i className="bi bi-search fs-5 align-bottom"></i>
                  </button>
                </form>
                <ul className="navbar-nav flex-grow-1 pe-3">
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      aria-current="page"
                      to="/AllProducts"
                    >
                      <span className="btn-font-lg">所有商品</span>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      to="/About"
                    >
                      <span className="btn-font-lg">關於我們</span>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      to="/Blog"
                    >
                      <span className="btn-font-lg">部落格</span>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      to="/FAQ"
                    >
                      <span className="btn-font-lg">常見問題</span>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      to="/SignIn"
                    >
                      <span className="btn-font-lg">會員專區</span>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <NavLink
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      to="/SignIn"
                    >
                      <span className="btn-font-lg">訂單追蹤</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="offcanvas-footer d-lg-none">
              <div className="container mb-6">
                <div className="d-flex justify-content-between mt-auto nav-btn">
                  <NavLink
                    className="btn btn-outline-light border-0 border-end btn-font-lg w-50 px-3 py-2"
                    to="/SignIn"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>登入</span>
                  </NavLink>
                  <NavLink
                    className="btn btn-outline-light border-0 btn-font-lg w-50 px-3 py-2"
                    to="/CheckOut"
                  >
                    <i className="bi bi-cart3 me-2"></i>
                    <span>購物車</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- 搜尋/帳號/購物車按鈕 --> */}
          <div className="d-none d-lg-block position-relative">
            <div className="d-lg-flex align-items-lg-center">
              {/* <!-- 搜尋欄位 --> */}
              <div className="collapse" id="collapseSearch">
                <form role="button">
                  <input
                    type="search"
                    className="form-control border-0 border-bottom bg-white-alpha"
                    id="exampleFormControlInput1"
                    placeholder="找商品"
                  />
                </form>
              </div>
              <button
                className="btn text-neutral-600"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSearch"
                aria-expanded="false"
                aria-controls="collapseSearch"
              >
                <i
                  className={`bi bi-search fs-6 align-bottom ${style.icon}`}
                ></i>
              </button>
              {/* <!-- 會員頭像 --> */}
              <div className="btn-group ms-2">
                <button
                  type="button"
                  className="d-none d-lg-inline bg-transparent border-0 p-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className={`bi bi-person-circle fs-5 ${style.icon}`}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 p-0">

                  {user ? (
                    <>
                      <li>
                        <div className="dropdown-item text-center py-3">
                          {user?.user_metadata?.full_name || user?.email}
                        </div>
                      </li>
                      <li><hr className="dropdown-divider m-auto" /></li>
                      <li>
                        <button
                          className="dropdown-item text-center py-3"
                          onClick={async () => {
                            await supabase.auth.signOut();
                          }}
                        >
                          登出
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <div className="dropdown-item text-center py-3">
                          <NavLink to="SignIn" className="text-decoration-none">
                            登入
                          </NavLink>
                        </div>
                      </li>
                      <li><hr className="dropdown-divider m-auto" /></li>
                      <li>
                        <div className="dropdown-item text-center py-3">
                          <NavLink to="SignUp" className="text-decoration-none">
                            註冊
                          </NavLink>
                        </div>
                      </li>
                    </>
                  )}

                </ul>
              </div>
              {/* <!-- 購物車 --> */}
              <div className="btn-group ms-2 d-none d-lg-block">
                <NavLink
                  className="d-none d-lg-inline bg-transparent border-0 p-2"
                  to="CheckOut"
                >
                  <i className={`bi bi-cart3 fs-5 ${style.icon}`}></i>

                  {/* 商品數量 badge */}
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
