// 常見問題
import { useMemo, useState } from "react";
import { Link } from "react-router";

export default function Faq() {
  const [breadcrumbLabel, setBreadcrumbLabel] = useState("所有問題");
  const categories = useMemo(
    () => [
      {
        id: "all",
        label: "所有問題",
        paneId: "pane-all",
        tabId: "tab-all",
        active: true,
      },
      {
        id: "product",
        label: "商品資訊",
        paneId: "pane-product",
        tabId: "tab-product",
      },
      {
        id: "guide",
        label: "購物說明",
        paneId: "pane-guide",
        tabId: "tab-guide",
      },
      {
        id: "member",
        label: "會員專區",
        paneId: "pane-member",
        tabId: "tab-member",
      },
    ],
    [],
  );

  const faqs = useMemo(
    () => [
      {
        id: 1,
        q: "要購買，一定要加入會員嗎？",
        a: "不一定，您可以使用訪客結帳；加入會員可享訂單查詢、專屬優惠等服務。",
        category: "all",
      },
      {
        id: 2,
        q: "請問是否有服務離島地區會員嗎？",
        a: "有的，離島地區可配送；運費與到貨天數依物流公告為準。",
        category: "all",
      },
      {
        id: 3,
        q: "你們的產品都是手工製作嗎？",
        a: "我們堅持小量生產，核心品項採手工流程，並搭配 HACCP 認證廠製程把關。",
        category: "product",
      },
      {
        id: 4,
        q: "我想取消訂單如何取消？",
        a: "於出貨前可在「會員中心 → 訂單」申請取消；若已出貨請聯繫客服協助。",
        category: "member",
      },
      {
        id: 5,
        q: "有哪些付款方式呢？",
        a: "支援信用卡、LINE Pay、銀行轉帳與貨到付款（部分商品／地區不適用）。",
        category: "guide",
      },
      {
        id: 6,
        q: "出貨說明",
        a: "平日下單 1–2 個工作天內出貨；特殊活動或節慶期間以頁面公告為準。",
        category: "guide",
      },
      {
        id: 7,
        q: "請問是否有服務離島地區會員呢？",
        a: "有的，我們提供離島配送方案，實際運費以結帳頁為準。",
        category: "all",
      },
    ],
    [],
  );

  return (
    <>
      <main className="container-md py-5 pt-lg-0 faq-page">
        {/* 麵包屑與搜尋 */}
        <div className="d-flex align-items-center justify-content-between mb-3 mt-6 mt-lg-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  首頁
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/FAQ" className="text-decoration-none">
                  常見問題
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <div className="d-none d-md-flex align-items-center">
            <div className="collapse" id="collapseSearchInput">
              <form className="d-flex align-items-center me-2" role="search">
                <input
                  type="search"
                  className="form-control border-0 border-bottom bg-transparent"
                  placeholder="找問題"
                  name="q"
                  style={{ width: 200 }}
                />
              </form>
            </div>

            <button
              className="btn btn-brand-outline px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSearchInput"
              aria-expanded="false"
              aria-controls="collapseSearchInput"
            >
              搜尋
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* 左：分類 */}
          <aside className="col-md-3">
            <div
              className="nav flex-column nav-pills faq-tabs"
              id="faqTab"
              role="tablist"
              aria-orientation="vertical"
            >
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`nav-link text-start ${c.active ? "active" : ""}`}
                  id={c.tabId}
                  data-bs-toggle="pill"
                  data-bs-target={`#${c.paneId}`}
                  type="button"
                  role="tab"
                  aria-controls={c.paneId}
                  aria-selected={c.active ? "true" : "false"}
                  onClick={() => setBreadcrumbLabel(c.label)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </aside>

          {/* 右：問題列表 */}
          <section className="col-md-9">
            {/* 你原本只有 tabs，但右側沒有 tab-pane；這裡補上結構 */}
            <div className="tab-content" id="faqTabContent">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`tab-pane fade ${c.active ? "show active" : ""}`}
                  id={c.paneId}
                  role="tabpanel"
                  aria-labelledby={c.tabId}
                  tabIndex={0}
                >
                  <div
                    className="accordion faq-accordion"
                    id={`faqAccordion-${c.id}`}
                  >
                    {faqs
                      .filter(
                        (item) =>
                          c.id === "all" ||
                          item.category === c.id ||
                          item.category === "all",
                      )
                      .map((item) => {
                        const headerId = `q-${c.id}-${item.id}`;
                        const collapseId = `a-${c.id}-${item.id}`;
                        return (
                          <div
                            className="accordion-item"
                            key={`${c.id}-${item.id}`}
                          >
                            <h2 className="accordion-header" id={headerId}>
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${collapseId}`}
                                aria-expanded="false"
                                aria-controls={collapseId}
                              >
                                <span className="faq-q">Q</span> {item.q}
                              </button>
                            </h2>
                            <div
                              id={collapseId}
                              className="accordion-collapse collapse"
                              aria-labelledby={headerId}
                              data-bs-parent={`#faqAccordion-${c.id}`}
                            >
                              <div className="accordion-body">{item.a}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* 分頁（目前是靜態） */}
            <nav aria-label="FAQ pagination" className="mt-4">
              <ul className="pagination justify-content-center pagination-brand">
                <li className="page-item disabled">
                  <span className="page-link">&lt;</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    &gt;
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </main>
    </>
  );
}
