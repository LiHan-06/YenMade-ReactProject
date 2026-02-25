// 關於我們
import { useEffect, useMemo, useRef, useState } from "react";

import Banner_about from "./assets/images/about/Banner_about.png";
import VectorGreen from "./assets/images/Vector-green.svg";
import VectorOrange from "./assets/images/Vector-orange.svg";
import Brand_story from "./assets/images/about/Brand_story.png";
import Brand_team from "./assets/images/about/Brand_team.png";
import Brand_concept_bg from "./assets/images/about/Brand_concept_bg.png";
import Brand_concept_bg_mobile from "./assets/images/about/Brand_concept_bg_mobile.png";
import About_carousel_1 from "./assets/images/about/About_carousel_1.png";
import About_carousel_2 from "./assets/images/about/About_carousel_2.png";
import About_carousel_3 from "./assets/images/about/About_carousel_3.png";
import About_carousel_4 from "./assets/images/about/About_carousel_4.png";
import About_carousel_5 from "./assets/images/about/About_carousel_5.png";
import About_carousel_6 from "./assets/images/about/About_carousel_6.png";

import { Link } from "react-router";

export default function About() {
  const scrollWrapperRef = useRef(null);
  const rafIdRef = useRef(null);

  // 用 state 控制速度（mouseenter/mouseleave 時更新）
  const [speed, setSpeed] = useState(2);

  const carouselImages = useMemo(
    () => [
      { src: About_carousel_1, alt: "照片1" },
      { src: About_carousel_2, alt: "照片2" },
      { src: About_carousel_3, alt: "照片3" },
      { src: About_carousel_4, alt: "照片4" },
      { src: About_carousel_5, alt: "照片5" },
      { src: About_carousel_6, alt: "照片6" },
    ],
    [],
  );

  useEffect(() => {
    const el = scrollWrapperRef.current;
    if (!el) return;

    // 避免 React StrictMode 開發環境下 effect 可能跑兩次造成重複 append
    if (!el.dataset.cloned) {
      const children = Array.from(el.children);
      children.forEach((node) => el.appendChild(node.cloneNode(true)));
      el.dataset.cloned = "true";
    }

    let scrollAmount = 0;

    const animate = () => {
      scrollAmount += speed;

      // scrollLeft 是元素水平捲動位置 [web:131]
      if (scrollAmount >= el.scrollWidth / 2) {
        scrollAmount = 0;
      }

      el.scrollLeft = scrollAmount;
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // cleanup：元件卸載/重跑 effect 時要 cancelAnimationFrame [web:129]
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [speed]);

  return (
    <>
      {/* banner */}
      <div className="mb-5 about-banner">
        <img src={Banner_about} alt="廚房圖片" className="w-100" />
      </div>

      <div className="container-sm">
        {/* 麵包屑導覽 */}
        <nav
          style={{ "--bs-breadcrumb-divider": "'>'" }}
          aria-label="breadcrumb"
          className="mb-80 ms-5 d-none d-md-block"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" aria-label="回首頁">
                <i className="bi bi-house-door" />
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              關於我們
            </li>
          </ol>
        </nav>

        {/* section1 */}
        <div className="row mb-80 align-items-center section1-3-row">
          <div className="col-12 col-md-5 offset-md-1 position-relative d-inline-block mb-3 mb-md-0 order-1 order-md-1">
            <p className="p1 mb-3 position-relative" style={{ zIndex: 2 }}>
              品牌故事
            </p>
            <img
              src={VectorGreen}
              alt="裝飾圖"
              className="position-absolute"
              style={{
                width: 32,
                height: 32,
                top: "-0.4em",
                left: "-0.2em",
                opacity: 0.5,
                zIndex: 1,
              }}
            />
            <h6 className="h6 mb-4">阿嬤留下來的，不只是食譜</h6>
            <p className="font-size-sm">
              YENMADE
              起點，是阿嬤廚房裡的幾罐玻璃瓶。小時候每次家人團聚，餐桌上總有她醃的小黄瓜、木耳、海帶芽，每道都簡單，卻讓人一直想再添一碗飯。
              長大後才發現，這些味道，其實是家的溫度。
              <br />
              我們希望把這份「熟悉卻被遺忘的好味道」保留下來，也讓它在更多人的生活中發光。
            </p>
          </div>
          <div className="col-12 col-md-5 offset-md-0 order-2 order-md-2">
            <img src={Brand_story} alt="#" className="img-fluid" />
          </div>
        </div>

        {/* section2 PC */}
        <div className="position-relative mb-80 section2 d-none d-md-block">
          <img
            src={Brand_concept_bg}
            alt="切菜圖"
            className="w-100 section2-bg"
          />
          <div className="section2-text position-absolute top-50 start-50 translate-middle-y text-white">
            <div className="position-relative d-inline-block">
              <p className="p1 mb-3 position-relative" style={{ zIndex: 2 }}>
                品牌理念
              </p>
              <img src={VectorGreen} alt="裝飾圖" className="decor-img" />
            </div>
            <h6 className="h6 mb-4">
              我們相信，好味道
              <br />
              應該慢慢做，也要吃得安心
            </h6>
            <p className="font-size-sm">
              YENMADE
              醃造所堅持少量製造，不是追求快速，而是重視每一道工序的用心。
              <br />
              選用天然食材，不添加防腐劑與化學調味，只用最簡單、最乾淨的方式，保留食物原本的風味。
              <br />
              因為我們知道，健康的飲食，不需要複雜，只需要真實。每一罐，都像家人親手做的那樣安心，是你日常裡也可以信任的好味道。
            </p>
          </div>
        </div>

        {/* section2 RWD */}
        <div className="position-relative mb-80 section2 d-block d-md-none">
          <img
            src={Brand_concept_bg_mobile}
            alt="切菜圖"
            className="w-100 section2-bg"
          />
          <div
            className="section2-text position-absolute top-50 start-50 text-white"
            style={{ transform: "translate(-45%, -15%)" }}
          >
            <div className="position-relative d-inline-block">
              <p className="p1 mb-3 position-relative" style={{ zIndex: 2 }}>
                品牌理念
              </p>
              <img src={VectorGreen} alt="裝飾圖" className="decor-img" />
            </div>
            <h6 className="h6 mb-3 text-nowrap">
              我們相信，好味道
              <br />
              應該慢慢做，也要吃得安心
            </h6>
            <p className="font-size-sm font-size-375">
              YENMADE
              醃造所堅持少量製造，不是追求快速，而是重視每一道工序的用心。
              <br />
              選用天然食材，不添加防腐劑與化學調味，只用最簡單、最乾淨的方式，保留食物原本的風味。
              <br />
              健康的飲食，不需要複雜，只需要真實。每一罐，都像家人親手做的那樣安心，是你日常裡也可以信任的好味道。
            </p>
          </div>
        </div>

        {/* section3 */}
        <div className="row mb-80 align-items-center section1-3-row">
          <div className="col-12 col-md-4 offset-md-1 position-relative d-inline-block mb-3 mb-md-0 order-1 order-md-1">
            <p className="p1 mb-3 position-relative" style={{ zIndex: 2 }}>
              我們的團隊
            </p>
            <img
              src={VectorOrange}
              alt="裝飾圖"
              className="position-absolute"
              style={{
                width: 32,
                height: 32,
                top: "-0.4em",
                left: "-0.2em",
                opacity: 0.5,
                zIndex: 1,
              }}
            />
            <h6 className="h6 mb-4">一口家的味道，一份傳承的心意</h6>
            <p className="font-size-sm">
              YENMADE
              醃造所不是一間大公司，而是一群家人一起完成的夢。我們的團隊成員，全部都是親戚，從阿嬤、姑姑到我們這一代，一起把家裡流傳下來的味道整理、改良、分享出去。
              我們希望把這份屬於家庭的好味道，好好保存下來，也慢慢傳承出去。每一罐醃製物，不只是產品，更是我們一家人一起做出來的心意與溫度。
            </p>
          </div>
          <div className="col-12 col-md-5 offset-md-1 order-2 order-md-2">
            <img
              src={Brand_team}
              alt="#"
              className="img-fluid d-none d-md-block"
            />
          </div>
        </div>
      </div>

      {/* carousel */}
      <section className="scroll-carousel py-5">
        <div
          className="scroll-wrapper"
          ref={scrollWrapperRef}
          onMouseEnter={() => setSpeed(0)}
          onMouseLeave={() => setSpeed(2)}
        >
          {carouselImages.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      </section>
    </>
  );
}
