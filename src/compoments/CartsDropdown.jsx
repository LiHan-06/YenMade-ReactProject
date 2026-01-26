function CartsDropdown() {
  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end p-0 px-9 carts-menu">
        <h5 className="fw-semibold text-center mx-auto my-4">購物車</h5>
        <li>
          <hr className="dropdown-divider m-auto" />
        </li>
        {/* <!-- 購物 1  --> */}
        <li className="row align-items-center">
          <img
            src="/assets/images/product/檸檬九層塔番茄_cutout.png"
            alt="檸檬九層塔番茄"
            className="col-4"
          />
          <div className="col-7 p-3">
            <h6 className="fs-7">檸檬九層塔番茄</h6>
            <p className="fs-8 m-0">500ml 慢醃大罐</p>
            <div className="input-group btn border-0 border-primary-600 bg-white px-0 py-2 w-75">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-dash-lg fs-6"></i>
                </button>
                <input
                  type="text"
                  className="form-control border-0 text-center text-dark fw-semibold p-0"
                  value="1"
                  id="buyNumber"
                />
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-plus-lg fs-6"></i>
                </button>
              </div>
            </div>
            <h5 className="fs-8 fw-bold m-0">
              NTD$<span className="fs-6 ms-1">550</span>
            </h5>
          </div>

          <button className="col-1 btn btn-font-lg" type="button">
            <i className="bi bi-x fs-5"></i>
          </button>
        </li>
        <li>
          <hr className="dropdown-divider m-auto" />
        </li>
        {/* <!-- 購物 2  --> */}
        <li className="row align-items-center">
          <img
            src="/assets/images/product/檸檬老醬蘿蔔_cutout.png"
            alt="檸檬老醬蘿蔔"
            className="col-4"
          />
          <div className="col-7 p-3">
            <h6 className="fs-7">檸檬老醬蘿蔔</h6>
            <p className="fs-8 m-0">500ml 慢醃大罐</p>
            <div className="input-group btn border-0 border-primary-600 bg-white px-0 py-2 w-75">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-dash-lg fs-6"></i>
                </button>
                <input
                  type="text"
                  className="form-control border-0 text-center text-dark fw-semibold p-0"
                  value="1"
                  id="buyNumber"
                />
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-plus-lg fs-6"></i>
                </button>
              </div>
            </div>
            <h5 className="fs-8 fw-bold m-0">
              NTD$<span className="fs-6 ms-1">500</span>
            </h5>
          </div>

          <button className="col-1 btn btn-font-lg" type="button">
            <i className="bi bi-x fs-5"></i>
          </button>
        </li>
        <li>
          <hr className="dropdown-divider m-auto" />
        </li>
        {/* <!-- 購物 3  --> */}
        <li className="row align-items-center">
          <img
            src="/assets/images/product/煙燻蒜香小黃瓜_cutout.png"
            alt="煙燻蒜香小黃瓜"
            className="col-4"
          />
          <div className="col-7 p-3">
            <h6 className="fs-7">煙燻蒜香小黃瓜</h6>
            <p className="fs-8 m-0">200ml 慢醃迷你</p>
            <div className="input-group btn border-0 border-primary-600 bg-white px-0 py-2 w-75">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-dash-lg fs-6"></i>
                </button>
                <input
                  type="text"
                  className="form-control border-0 text-center text-dark fw-semibold p-0"
                  value="2"
                  id="buyNumber"
                />
                <button type="button" className="btn border-0 p-9">
                  <i className="bi bi-plus-lg fs-6"></i>
                </button>
              </div>
            </div>
            <h5 className="fs-8 fw-bold m-0">
              NTD$<span className="fs-6 ms-1">250</span>
            </h5>
          </div>

          <button className="col-1 btn btn-font-lg" type="button">
            <i className="bi bi-x fs-5"></i>
          </button>
        </li>
        <li>
          <hr className="dropdown-divider m-auto" />
        </li>
        <li>
          <div className="d-flex justify-content-between px-3 py-5">
            <h5>總計：</h5>
            <h5>
              NTD$ <span className="fw-semibold">1300</span>
            </h5>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider m-auto" />
        </li>
        <li>
          <button
            className="dropdown-item btn-font-lg text-center py-3"
            type="button"
            onclick="location.href='../pages/member-checkout.html'"
          >
            前往結帳
          </button>
        </li>
      </ul>
    </>
  );
}
