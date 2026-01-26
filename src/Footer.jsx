// footer
import Logo_Vertical from "./assets/images/logo/Type=Logo_Vertical.svg";

const CommList = ({ className, href, id }) => {
  return (
    <li className={`fs-sm-icon text-white ${className}`}>
      <a href={href} className="px-2 py-1">
        <i className={`bi bi-${id}`}></i>
      </a>
    </li>
  );
};

const CommItems = [
  {
    id: "facebook",
    href: "https://www.facebook.com",
  },
  {
    id: "line",
    href: "https://www.line.me",
  },
  {
    id: "threads",
    href: "https://www.threads.com",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com",
  },
  {
    id: "youtube",
    href: "https://www.youtube.com",
  },
];

function Footer() {
  return (
    <>
      <footer className="bg-primary-500">
        <section className="container py-8">
          <div className="row justify-content-center align-items-md-center">
            <div className="col-md-2 text-center mb-4 d-md-none">
              <img
                src={Logo_Vertical}
                alt="logo-yenmade"
                className="svg-white width-sm py-2"
              />
            </div>
            <div className="col-md-5 col-xl-4 mb-3 mb-md-0">
              <div className="d-md-none">
                <ul className="list-unstyled d-flex justify-content-center mb-2">
                  {CommItems.map((item) => (
                    <CommList
                      key={item.id}
                      href={item.href}
                      id={item.id}
                      className={item.id === "youtube" ? "me-0" : "me-2"}
                    />
                  ))}
                </ul>
              </div>
              <div className="text-white fs-9 fs-lg-8 text-center text-md-start">
                <p className="mb-2">客服專線 ｜ 0800-168-888</p>
                <p className="mb-2">服務時間 ｜ 周一至周五 ｜ 09:00 - 18:00</p>
                <p className="mb-2">客服信箱 ｜ yenmadeservice@gmail.com</p>
                <p className="mb-0">地址 ｜ 桃園縣桃園市醃造路8段8樓之8</p>
              </div>
            </div>
            <div className="col-md-2 text-center d-none d-md-block mb-md-0">
              <img
                src={Logo_Vertical}
                alt="logo-yenmade"
                className="svg-white width-sm py-2"
              />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-end">
              <div className="d-none d-md-block">
                <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-md-end mb-2 mb-md-4">
                  {CommItems.map((item) => (
                    <CommList
                      key={item.id}
                      href={item.href}
                      id={item.id}
                      className={item.id === "facebook" ? "ms-0" : "ms-2"}
                    />
                  ))}
                </ul>
              </div>
              <div className="mb-0">
                <p className="text-white fs-9 fw-medium opacity-75 opacity-md-100">
                  Copyright © 2025 YENMADE
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;

