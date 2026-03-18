import { useParams } from "react-router-dom";
import { posts } from "./data/posts";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <div className="container py-5">文章準備中...</div>;

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <img src={post.imgSrc} className="w-100 rounded mb-4" alt={post.title} />
          <h1 className="fw-bold mb-3">{post.title}</h1>
          <div className="d-flex justify-content-between text-muted mb-4 border-bottom pb-3">
            <span>作者：{post.author}</span>
            <time>{post.dateText}</time>
          </div>
          {/* 關鍵：渲染 HTML 字串 */}
          <div 
            className="blog-post-content fs-5" 
            style={{ lineHeight: '1.8', color: '#444' }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
    </main>
  );
}