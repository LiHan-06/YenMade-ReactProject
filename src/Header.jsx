// header
import CartsDropdown from "./components/CartsDropdown.jsx";
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

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-dark pageScroll py-5 ${style.navbar}`}
      >
        <div className="container px-4">
          <a className="navbar-brand p-0 me-lg-45" href="index.html">
            <img
              className={`${style.logo} logo-size`}
              src={Logo_Horizontal}
              alt="yenmade's logo"
            />
          </a>
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
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      aria-current="page"
                      href="../pages/allproducts.html"
                    >
                      <span className="btn-font-lg">所有商品</span>
                    </a>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      href="../pages/about.html"
                    >
                      <span className="btn-font-lg">關於我們</span>
                    </a>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      href="../pages/blog.html"
                    >
                      <span className="btn-font-lg">部落格</span>
                    </a>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      href="../pages/faq.html"
                    >
                      <span className="btn-font-lg">常見問題</span>
                    </a>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      href="../pages/member-center.html"
                    >
                      <span className="btn-font-lg">會員專區</span>
                    </a>
                  </li>
                  <li
                    className={`nav-item text-center border-md-bottom ${style.navLi}`}
                  >
                    <a
                      className={`${style.navLink} nav-link py-3 py-lg-0 px-lg-4 active`}
                      href="../pages/member-center.html"
                    >
                      <span className="btn-font-lg">訂單追蹤</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="offcanvas-footer d-lg-none">
              <div className="container mb-6">
                <div className="d-flex justify-content-between mt-auto nav-btn">
                  <a
                    className="btn btn-outline-light border-0 border-end btn-font-lg w-50 px-3 py-2"
                    href="/yenmade/pages/finished-checkout.html"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>登入</span>
                  </a>
                  <a
                    className="btn btn-outline-light border-0 btn-font-lg w-50 px-3 py-2"
                    href="/yenmade/pages/member-checkout.html"
                  >
                    <i className="bi bi-cart3 me-2"></i>
                    <span>購物車</span>
                  </a>
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
              <div className="btn-group ms-3">
                <button
                  type="button"
                  className="d-none d-lg-inline dropdown-toggle bg-transparent border-0 p-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className={`bi bi-person-circle fs-5 ${style.icon}`}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 p-0">
                  <li>
                    <button
                      className="dropdown-item btn-font-lg text-center py-3"
                      type="button"
                      onClick="#"
                    >
                      登入
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider m-auto" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item btn-font-lg text-center py-3"
                      type="button"
                      onClick="#"
                    >
                      註冊
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider m-auto" />
                  </li>
                </ul>
              </div>
              {/* <!-- 購物車 --> */}
              <div className="btn-group ms-3 d-none d-lg-block">
                <button
                  type="button"
                  className="d-none d-lg-inline dropdown-toggle bg-transparent border-0 p-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className={`bi bi-cart3 fs-5 ${style.icon}`}></i>
                </button>
                <CartsDropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
