//首頁
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import './App.css'

import NewArrivalsbg from './assets/images/New_bg_img.jpg';
import finalCtaMobile from './assets/images/FinalCTA_bg_mobile.png';
import finalCtaDesktop from './assets/images/FinalCTA_bg_img.jpg';
// import './index.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getProducts();
    getCustomerReviews();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*, variants:product_variants(*)"); // ✅抓 products + 變體

    if (error) {
      // console.error("Supabase GET error:", error);
    } else {
      setProducts(data);
    }
  }

  async function getCustomerReviews() {
    const { data, error } = await supabase
      .from("customer_reviews")
      .select("*")

    if (error) {
      // console.error("Customer reviews error:", error);
    } else {
      setReviews(data);
    }
  }

  function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const reviewPages = chunk(reviews, 3);

  return (
    <>
    {/* Section / Hero */}
    <div className='container-fluid p-0'>
      <img src="./src/assets/images/Hero_bg_pc.png" alt="Hero picture" className="w-100 d-block"/>
    </div>
    {/* Section / NewArrivals */}
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* 上方 65% 背景區 */}
      <div
        style={{
          height: "65%",
          backgroundImage: `url(${NewArrivalsbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="container position-relative z-1000 h-100 d-flex align-items-center">
          <div className="row justify-content-between align-items-center w-100" style={{ paddingTop: "190px" }}>
            {/* 左側文字 */}
            <div className="col-5 col-lg-2 text-center text-lg-start">
              <div className="flavors-heading mt-4 mt-lg-184 mb-4 mb-lg-6">
                <h2 className="text-primary-600 mb-3 mb-lg-4 text-nowrap">新味登場</h2>
                <p className="fs-7 letter-spacing-lg text-neutral-600 mb-0 d-inline d-lg-block text-nowrap">
                  我們花了點時間，
                </p>
                <p className="fs-7 letter-spacing-lg text-neutral-600 mb-0 d-inline d-lg-block text-nowrap">
                  把新味道醃進來了
                </p>
              </div>
              <a className="btn btn-outline-primary-500 px-4 py-9 mb-4 mb-lg-288" href="#">
                看更多商品
              </a>
            </div>
            {/* 右側產品卡片 */}
            <div className="col-12 col-lg-9">
              <div className="row my-4 my-lg-120 new-flavors-cards" >
                {products.length > 0 ? (
                  products
                    .filter((product) =>
                      ["鹽麴醃香菇", "煙燻蒜香小黃瓜", "醋醃紫洋蔥"].includes(product.title)
                    )
                    .map((product) => {
                      const targetVariant = product.variants.find(
                        (v) => v.name === "200ml 慢醃迷你"
                      );
                      if (!targetVariant) return null;

                      return (
                        <div className="col" key={targetVariant.id}>
                          <div className="card card-bg-no border-0 position-relative">
                            {/* 圖片 */}
                            <div className="card-img-wrapper position-relative" style={{ marginBottom: "-70px" }}>
                              <img
                                src={product.images_url || "#"}
                                className="card-img-top mx-auto d-block overlap-img"
                                alt={product.title}
                              />
                            </div>
                            {/* 文字內容 */}
                            <div className="card-body bg-primary-100 pt-5">
                              <h5 className="card-title pt-2 pb-1 text-center">{product.title}</h5>
                              <p className="card-text text-neutral-600 justify-content-start mb-4">
                                {product.description || ""}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <button className="btn bg-neutral-300 btn-sm cart-btn">
                                  <i className="bi bi-cart3"></i>
                                  <span className="btn-text">加入購物車</span>
                                </button>
                                <span className="py-1">NTD$ {targetVariant.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="col-12 d-flex justify-content-center">
                    <div className="no-products-card text-center p-5">
                      <i className="bi bi-hourglass-split fs-1 mb-3 text-neutral-400"></i>
                      <p className="mb-2 fs-4 fw-semibold">請稍等</p>
                      <p className="text-neutral-600 mb-0">產品資料正在努力載入中</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 下方 35% 純色區 */}
      <div
        style={{
          height: "35%",
          backgroundColor: "#979D6E", // primary/500
          width: "100%",
        }}
      ></div>
    </div>
    {/*Section / Features*/}
    <section>
      <div className="container position-relative">
        {/* 我們怎麼醃出這一味 */}
          <div className="section-title3 d-flex align-items-center mb-96 mt-120">
            <div className="line flex-grow-1 border-top d-none d-md-block"></div>
            <p className="title text-primary h2 text-center m-0">
            我們怎麼<span className="d-block d-sm-inline">醃出這一味？</span>
            {/* 手機 d-block 斷行；平板以上一行 */}
            </p>
            <div className="line flex-grow-1 border-top d-none d-md-block"></div>
          </div>
          <div className="container-1076 mx-auto text-center">
            {/* 製作方法1 */}
            <div className="row mb-8">
              {/* 介紹 */}
              <div className="col-3 offset-1 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img src="./src/assets/images/Vector-green.svg" alt="#" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle h4 text-white">01</span>
                </div>
                <div className="mb-3 step-copy text-nowrap">
                  <p className="h4 mb-0 ">選用在地小農</p>
                  <i className="bi bi-x-lg step-x mx-2 my-3 icon-24"></i>
                  <p className="h4 mb-0">新鮮食材</p>
                </div>
                <div className="step-desc  d-inline-block mx-auto text-center">
                <div className="text-neutral-600">每一口都吃得到</div>
                <div className="text-neutral-600">當季的踏實與鮮甜</div>
                <div className="text-neutral-600">不添加化學品</div>
              </div>
            </div>
              {/* 圖片 */}
              <div className="col-7 position-relative d-flex align-items-end">
                <div className="carrot-img-wrap ms-auto">
                <img
                  src="./src/assets/images/Feature-img.jpg"
                  alt="蔬果圖片"
                  className="w-100 carrot-img"
                />
                </div>
                <img
                  src="./src/assets/images/illustration/Illustration_salt.svg"
                  alt="灑鹽插圖"
                  className="illustration-salt"
                />
              </div>
            </div>
            {/* 製作方法2 */}
            <div className="row mb-8 mt-120">
              {/* 圖片 */}
              <div className="position-relative col-7 offset-1 d-flex align-items-end">
                <div className="pickled-img-wrap ms-auto">
                <img
                  src="./src/assets/images/Feature-img-1.jpg"
                  alt="醃製過程圖"
                  className="w-100 main-img pickled-img"
                />
                </div>
                <img
                  src="./src/assets/images/illustration/Illustration_cut.svg"
                  alt="切菜插圖"
                  className="illustration-cut"
                />
              </div>
              {/* 介紹 */}
              <div className="col-3 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img src="./src/assets/images/Vector-orange.svg" alt="#" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle h4 text-white">02</span>
                </div>
                <div className="mb-3 step-copy text-nowrap">
                  <p className="h4 mb-0">低油低鹽</p>
                  <i className="bi bi-x-lg step-x mx-2 my-3 icon-24"></i>
                  <p className="h4 mb-0">天然發酵</p>
                </div>
                <div className="step-desc d-inline-block mx-auto text-center">
                  <div className="text-neutral-600">不靠添加物延長保存</div>
                  <div className="text-neutral-600">我們用時間做保存</div>
                </div>
              </div>
            </div>
            {/* 製作方法3 */}
            <div className="row mb-8 mt-120">
              {/* 介紹 */}
              <div className="col-3 offset-1 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img src="./src/assets/images/Vector-green.svg" alt="#" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle h4 text-white">03</span>
                </div>
                <div className="mb-3 step-copy text-nowrap">
                  <p className="h4 mb-0">純手工製作</p>
                  <i className="bi bi-x-lg step-x mx-2 my-3 icon-24"></i>
                  <p className="h4 mb-0">細火慢熬</p>
                </div>
                <div className="step-desc d-inline-block mx-auto text-center">
                  <div className="text-neutral-600 ">從切菜、殺菌、醃漬</div>
                  <div className="text-neutral-600 ">每一步都有人親手照顧</div>
                </div>
              </div>
              {/* 圖片 */}
              <div className="position-relative col-7 offset-1 d-flex align-items-end">
                <div className="cut-img-wrap ms-auto">
                <img
                  src="./src/assets/images/Feature-img-2.jpg"
                  alt="切菜圖"
                  className="w-100 main-img cut-img"/>
                </div>
                <img
                  src="./src/assets/images/illustration/Illustration_glass_jam.svg"
                  alt="瓶罐插圖"
                  className="illustration-glass"
                />
              </div>
            </div>
            {/* 製作方法4 */}
            <div className="row mb-8 mt-120">
              {/* 圖片 */}
              <div className="position-relative col-7 offset-1 d-flex align-items-end">
                <div className="can-img-wrap ms-auto">
                <img
                  src="./src/assets/images/Feature-img-3.jpg"
                  alt="罐裝醃製瓶罐圖"
                  className="w-100 can-img"/>
                </div>
              </div>
              {/* 介紹 */}
              <div className="col-3 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img src="./src/assets/images/Vector-orange.svg" alt="#" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle h4 text-white">04</span>
                </div>
                <div className="mb-3 step-copy text-nowrap">
                  <p className="h4 mb-0">密封玻璃罐裝</p>
                  <i className="bi bi-x-lg step-x mx-2 my-3 icon-24"></i>
                  <p className="h4 mb-0">安心看得見</p>
                </div>
                <div className="step-desc d-inline-block mx-auto text-center">
                  <div className="text-neutral-600">食材泡在裡面是什麼</div>
                  <div className="text-neutral-600">一眼就知道</div>
                </div>
              </div>
            </div>
            {/* 製作方法5 */}
            <div className="row mb-184 mt-120">
              {/* 介紹 */}
              <div className="col-3 offset-1 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img src="./src/assets/images/Vector-green.svg" alt="#" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle h4 text-white">05</span>
                </div>
                <div className="mb-3 step-copy text-nowrap">
                  <p className="h4 mb-0">老味新作</p>
                  <i className="bi bi-x-lg step-x mx-2 my-3 icon-24"></i>
                  <p className="h4 mb-0">配飯配麵都合</p>
                </div>
                <div className="step-desc d-inline-block mx-auto text-center">
                  <div className="text-neutral-600  ">阿嬤傳下來的味道中改良</div>
                  <div className="text-neutral-600 ">怎麼搭都對味</div>
                </div>
              </div>
              {/* 圖片 */}
              <div className="position-relative col-7 offset-1 d-flex align-items-end">
              <div className="rice-img-wrap ms-auto">
                <img
                  src="./src/assets/images/Feature-img-4.jpg"
                  alt="醃漬物配飯糰"
                  className="w-100 main-img rice-img"/>
              </div>
              </div>
                <img
                  src="./src/assets/images/illustration/Illustration_plate.svg"
                  alt="盤子插圖"
                  className="illustration-plate"
                />
            </div>
          </div>
      </div>
    </section>
    {/*Section / Testimonials*/}
    <section>
      <div className="container-md my-5">
        <div className="d-flex align-items-center mb-3 mt-160">
          <div
            className="flex-grow-1 border-top"
            style={{ "--bs-border-color": "#997e6f" }}
          ></div>
          <h2
            className="section-title4 h2 text-secondary-600 text-center mx-4 mb-0"
            style={{ color: "#997e6f" }}
          >
            那些被點頭的瞬間
          </h2>
          <div
            className="flex-grow-1 border-top"
            style={{ "--bs-border-color": "#997e6f" }}
          ></div>
        </div>
        <p className="text-center text-muted mb-8">
          餐桌上的微笑，是我們最想收到的肯定
        </p>
        {/* 卡片區 */}
        <div className="px-150">
          <div
            id="reviewCarousel"
            className="carousel carousel-dark slide px-15 mb-160"
            data-bs-ride="false"
          >
            <div className="carousel-inner">
              {reviewPages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className={`carousel-item ${
                    pageIndex === 0 ? "active" : ""
                  }`}
                >
                  <div className="row g-3 justify-content-center review-scroller">
                    {page.map((review) => (
                      <div key={review.id} className="col-12 col-md-4">
                        <div className="card h-100 border-secondary review-card">
                          <div className="review-text">
                            <div className="card-body d-flex align-items-start pe-5">
                              <p className="card-text fs-8 m-0 truncate-sm">
                                {review.comment}
                              </p>
                              <div className="d-flex flex-column align-items-center ms-auto mt-3  meta-box">
                                <img
                                  className="rounded-circle"
                                  src={review.photo_url}
                                  alt={review.name}
                                />
                                <small className="meta-name text-center">
                                  <span className="role fs-9 text-secondary pt-2 d-inline-block">
                                    {review.occupation}
                                  </span>
                                  <span className="name d-block fs-0 text-secondary">
                                    {review.name}
                                  </span>
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* 左右箭頭 */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#reviewCarousel"
              data-bs-slide="prev"
            >
              <span
                className="bi bi-arrow-left-square-fill fs-1 ms--200"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#reviewCarousel"
              data-bs-slide="next"
            >
              <span
                className="bi bi-arrow-right-square-fill fs-1 me--200"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    {/* Section / FinalCTA */}
    <section className="position-relative">
      <img
        src={window.innerWidth >= 576 ? finalCtaDesktop : finalCtaMobile}
        alt="Final CTA"
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
      />
      <div className="text-center position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <h2 className="fs-3 fs-md-2">買的不是食物</h2>
        <h2 className="fs-3 fs-md-2 mb-4">是替日常留點餘裕</h2>
        <h5 className="fs-0 fs-md-5 fw-semibold text-neutral-600 mb-4">
          把時間留給重要的人，晚餐交給我們
        </h5>
        <a href="#" className="btn btn-outline-secondary-600 btn-sm">
          <span className="fs-0">挑一味</span>
        </a>
      </div>
    </section>
    </>
  )
} 

export default App