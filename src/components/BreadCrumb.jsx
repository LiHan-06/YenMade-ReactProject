function Breadcrumb() {
  return (
    <div className="d-none d-sm-block">
      <div className="px-0 px-md-4 px-lg-6 py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item breadcrumb-link">
              <a href="#" className="text-decoration-no py-9">
                <i className="bi bi-house-door fs-8"></i>
              </a>
            </li>
            <li className="breadcrumb-item breadcrumb-link" aria-current="page">
              <a href="#" className="text-decoration-no fs-8 py-9">
                所有商品
              </a>
            </li>
            <li
              className="breadcrumb-item breadcrumb-link active"
              aria-current="page"
            >
              <a href="#" className="text-decoration-no fs-8 py-9">
                檸檬老醬蘿蔔
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
