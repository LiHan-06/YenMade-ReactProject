import React, { useState, useEffect } from "react";
import { getProductsApi } from "./api/products";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("所有商品"); // 預設值改為中文
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductsApi();
        // 檢查 res.data 是否存在
        setProducts(res.data || []);
      } catch (err) {
        console.error("API 請求出錯:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 篩選邏輯：對齊 API 的中文分類名稱
  const filteredProducts =
    currentTab === "所有商品"
      ? products
      : products.filter((p) => p.category === currentTab);

  if (loading) return <div className="text-center mt-5">醃漬中...</div>;

  return (
    <div className="all-products-page">
      {/* Banner 區域 */}
      <div className="mt-104 d-none d-lg-block">
        <img
          src="src/assets/images/第二階段更新/img/Banner_allproducts.png"
          alt="banner"
          className="img-fluid w-100"
        />
      </div>

      <main className="container mb-160">
        <div className="row justify-content-center">
          {/* 左側分類選單：ID 必須與 API 的 category 欄位字串完全一致 */}
          <div className="col-md-3">
            <ul className="nav nav-tabs border-0 d-flex flex-md-column nav-scroll-mobile">
              {[
                { id: "所有商品", label: "所有商品" },
                { id: "熱門商品", label: "熱門商品" },
                { id: "經典系列", label: "經典系列" },
                { id: "清爽系列", label: "清爽系列" },
                { id: "勁辣系列", label: "勁辣系列" },
              ].map((tab) => (
                <li key={tab.id} className="nav-item border-bottom mb-md-2">
                  <button
                    className={`nav-link border-0 nav-item-base ${currentTab === tab.id ? "active" : ""}`}
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 右側商品列表 */}
          <div className="col-12 col-md-9 mt-md-0 mt-4 ps-md-2">
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-6 col-md-4" key={product.id}>
                    <div className="card mb-3 mb-md-4 border-0 position-relative product-hover-card">
                      {/* 使用 API 欄位: image_url */}
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="img-fluid"
                      />

                      <div className="card-body p-0 ps-md-3 pt-md-3 text-md-start text-center">
                        <p className="card-title mb--4">{product.title}</p>
                        <p className="d-inline fs-md-6 fs-8">
                          NTD$ {product.price}
                        </p>
                      </div>

                      {/* Hover 效果區 */}
                      <div className="product-hover-content d-none d-md-flex">
                        <div className="hover-text-area">
                          <p>{product.summary || "新鮮直送，美味醃漬。"}</p>
                        </div>
                        <div className="hover-cart-area">
                          <div className="d-flex justify-content-between align-items-center w-100 px-3">
                            <div className="text-white text-start">
                              <p className="mb-0">{product.title}</p>
                              <p className="mb-0">${product.price}</p>
                            </div>
                            <i className="bi bi-cart3 text-white fs-4"></i>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`#/product/${product.id}`}
                        className="stretched-link"
                      ></a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p>該分類目前沒有商品，來看看其他的吧！</p>
                  <button
                    onClick={() => setCurrentTab("所有商品")}
                    className="btn btn-outline-primary"
                  >
                    回所有商品
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
