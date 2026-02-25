// 部落格
import { useMemo } from "react";
import BlogImg1 from "./assets/images/1.jpg";
import BlogImg2 from "./assets/images/2.jpeg";
import BlogImg3 from "./assets/images/3.jpg";
import BlogImg4 from "./assets/images/4.jpg";
import BlogImg5 from "./assets/images/5.jpg";
import BlogImg6 from "./assets/images/6.jpg";

export default function Blog() {
  const posts = useMemo(
    () => [
      {
        id: 1,
        imgSrc: BlogImg1,
        imgAlt: "小黃瓜",
        author: "王小明營養師",
        dateISO: "2025-10-05",
        dateText: "2025/10/05",
        title: "醃製小黃瓜可以放幾天？怎麼保存才不會爛？【新手必看】",
        href: "#",
      },
      {
        id: 2,
        imgSrc: BlogImg2,
        imgAlt: "小黃瓜",
        author: "陳美美主廚",
        dateISO: "2025-09-20",
        dateText: "2025/09/20",
        title: "夏日涼拌小菜靈感集：三款輕鬆上桌的醃製料理",
        href: "#",
      },
      {
        id: 3,
        imgSrc: BlogImg3,
        imgAlt: "小黃瓜",
        author: "林小菜營養師",
        dateISO: "2025-09-15",
        dateText: "2025/09/15",
        title: "醃製蔬菜的營養差很多嗎？其實比你想的更有趣",
        href: "#",
      },
      {
        id: 4,
        imgSrc: BlogImg4,
        imgAlt: "小黃瓜",
        author: "張鹽鹽食品研師",
        dateISO: "2025-09-10",
        dateText: "2025/09/10",
        title: "低鹽醃製可能嗎？減鹽不減味的 4 個關鍵技巧",
        href: "#",
      },
      {
        id: 5,
        imgSrc: BlogImg5,
        imgAlt: "小黃瓜",
        author: "李大傑主廚",
        dateISO: "2025-08-25",
        dateText: "2025/08/25",
        title: "醃製時間過長會怎樣？風味變化與保存觀察",
        href: "#",
      },
      {
        id: 6,
        imgSrc: BlogImg6,
        imgAlt: "小黃瓜",
        author: "醃造所前端團隊",
        dateISO: "2025-08-01",
        dateText: "2025/08/01",
        title: "前端開發：團隊心得與感謝",
        href: "#",
      },
    ],
    [],
  );

  return (
    <>
      <main className="container-md py-5 blog-page">
        <h2 className="text-center fw-semibold mb-4 mt-120">部落格</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {posts.map((post) => (
            <div className="col" key={post.id}>
              <article className="card blog-card h-100">
                <div className="card-body">
                  <div className="blog-thumb">
                    <img
                      src={post.imgSrc}
                      alt={post.imgAlt}
                      className="w-100 h-100 object-fit-cover d-block"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center small text-neutral-500 mt-2">
                    <span>{post.author}</span>
                    <time dateTime={post.dateISO}>{post.dateText}</time>
                  </div>

                  <p className="mt-2 mb-3">{post.title}</p>

                  <div className="text-end">
                    <a href={post.href} className="link-brand">
                      閱讀更多 &raquo;&raquo;&raquo;
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
