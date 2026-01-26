import React, { useState, useEffect } from "react";
import { getProductsApi } from "./api/products";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsApi()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // 過濾邏輯
  const filteredProducts =
    currentTab === "all"
      ? products
      : products.filter((p) => p.category === currentTab);

  return (
    <div className="all-products-page">
      {/* 1. Banner - 使用相對路徑，Vite 會處理 src 內的圖片 */}
      <div className="mt-104 d-none d-lg-block">
        <img
          src="src/assets/images/第二階段更新/img/Banner_allproducts.png"
          alt="banner"
          className="img-fluid w-100 h-100"
        />
      </div>
      <div className="mt-104 d-lg-none">
        <img
          src="src/assets/images/第二階段更新/img/Banner_allproducts_mobile.png"
          alt="mobile banner"
          className="img-fluid w-100 h-100"
        />
      </div>

      <main className="container mb-160">
        {/* 2. Breadcrumb */}
        <div className="d-none d-sm-block ms-3">
          <div className="px-0 px-md-4 px-lg-6 py-3">
            <nav
              style={{ "--bs-breadcrumb-divider": "'〉'" }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item breadcrumb-link">
                  <a href="/" className="text-decoration-none py-9">
                    <i className="bi bi-house-door fs-8"></i>
                  </a>
                </li>
                <li className="breadcrumb-item breadcrumb-link active">
                  <span className="fs-8 py-9">所有商品</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* 3. Sidebar Categories */}
          <div className="col-md-3 col-12 ms--10">
            <ul className="nav nav-tabs border-0 d-flex flex-md-column nav-scroll-mobile">
              {[
                { id: "all", label: "所有商品" },
                { id: "hot", label: "熱門商品" },
                { id: "classic", label: "經典系列" },
                { id: "cool", label: "清爽系列" },
                { id: "spicy", label: "勁辣系列" },
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

          {/* 4. Product Grid */}
          <div className="col-12 col-md-9 mt-md-0 mt-4 ps-md-2">
            <div className="row">
              {loading ? (
                <div className="text-center py-5">醃漬中...</div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-6 col-md-4" key={product.id}>
                    <div className="card mb-3 mb-md-4 border-0 position-relative product-hover-card">
                      {/* Badge Area */}
                      <div
                        className="position-absolute top-0 start-0 m-2 d-flex flex-column align-items-start"
                        style={{ zIndex: 5 }}
                      >
                        {product.is_new && (
                          <span
                            className="badge mb-2 px-2 py-1"
                            style={{
                              backgroundColor: "#DDD292",
                              color: "black",
                            }}
                          >
                            新品
                          </span>
                        )}
                        {product.is_hot && (
                          <span
                            className="badge px-2 py-1"
                            style={{
                              backgroundColor: "#DDD292",
                              color: "black",
                            }}
                          >
                            熱門
                          </span>
                        )}
                      </div>

                      {/* API Image */}
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="img-fluid"
                      />

                      <div className="card-body p-0 ps-md-3 pt-md-3 text-md-start text-center">
                        <p className="card-title mb--4">{product.title}</p>
                        <p className="d-inline mb-1 fs-md-8 fs-9">NTD$</p>
                        <p className="d-inline fs-md-6 fs-8">{product.price}</p>

                        {/* Mobile Add to Cart */}
                        <button className="btn btn-sm d-block bg-primary-50 d-md-none pb-12 mt-2 z w-100">
                          <i className="bi bi-cart3 d-inline"></i>
                          <span className="fs-9 ms-1">加入購物車</span>
                        </button>
                      </div>

                      {/* Desktop Hover Effect */}
                      <div className="product-hover-content d-none d-md-flex">
                        <div className="hover-text-area">
                          <p>
                            {product.description_short ||
                              "職人手作，鮮甜脆口。"}
                          </p>
                        </div>
                        <div className="hover-cart-area">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="card-title mb-0">{product.title}</p>
                              <p className="mb-0">NTD$ {product.price}</p>
                            </div>
                            <button className="btn p-0">
                              <i className="bi bi-cart3 text-white fs-4"></i>
                            </button>
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
                  小廚房忙碌中，敬請期待
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
