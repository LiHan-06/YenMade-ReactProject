import { Link } from "react-router";

function Breadcrumb({ product }) {
  return (
    <div className="d-none d-sm-block">
      <div className="px-0 px-md-4 px-lg-6 py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item breadcrumb-link">
              <Link to="/" className="text-decoration-no py-9">
                <i className="bi bi-house-door fs-8"></i>
              </Link>
            </li>
            <li className="breadcrumb-item breadcrumb-link" aria-current="page">
              <Link to="/AllProducts" className="text-decoration-no fs-8 py-9">
                所有商品
              </Link>
            </li>
            <li
              className="breadcrumb-item breadcrumb-link active"
              aria-current="page"
            >
              <Link to="#" className="text-decoration-no fs-8 py-9">
                {product.title}
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
