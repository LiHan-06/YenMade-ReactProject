import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";

import productOne from "./assets/images/product/檸檬九層塔番茄_cutout.png";

function CartStepOne() {
  // const { id } = useParams();
  const id = "23d5e2f5-1bfb-4a3e-9348-dbc1c2a23b59";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // 儲存選擇的商品規格
  const [selectedVariant, setSelectedVariant] = useState(null);
  // 儲存目前的購買數量 (預設為1)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, variants:product_variants(*)`)
        // 假設你的規格表名稱是 product_variants，這會執行「左連接」
        .eq("id", id)
        .single(); // 只拿一筆,加上 .single() 會直接回傳物件而非陣列

      if (!error && data) {
        console.log("成功抓到資料:", data); // Debug 用
        setProduct(data);
        // 預設選取第一個規格
        // 確保 API 回傳後立即設定初始規格
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } else {
        console.error("讀取失敗:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);
  // 控制購買數量
  const plusNum = () => {
    if (selectedVariant && quantity < selectedVariant?.stock) {
      console.log("成功加入");
      setQuantity((prev) => prev + 1);
    }
  };
  const minusNum = () => {
    if (selectedVariant && quantity > 1) {
      console.log("成功減少");
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <p>載入中...</p>;
  if (!product) return <p>找不到商品</p>;

  return (
    <section className="row" id="stepOne">
      {/* 購買清單 */}
      <div className="col-lg-8">
        <div className="border">
          {/* box head */}
          <div className="bg-neutral-100 py-3 ps-4 mb-0">
            <p className="mb-0">{`購物車 (共 3 項)`}</p>
          </div>
          {/* table head */}
          <div className="border-bottom border-neutral px-4 d-none d-md-block">
            <ul className="row list-unstyled mb-0 ">
              <li className="col-5 py-3">
                <p className="text-align-center mb-0">商品資訊</p>
              </li>
              <li className="col-4 py-3">
                <p className="text-align-center mb-0">商品數量</p>
              </li>
              <li className="col-3 py-3 ">
                <p className="text-end text-align-center mb-0">小計</p>
              </li>
            </ul>
          </div>
          {/* 商品 list */}
          <ul className="list-unstyled mb-0 px-9">
            {/* 商品規則 */}
            <li className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral">
              <div className="col-12 col-md-5 d-flex align-items-center justify-content-start">
                <img
                  src={productOne}
                  alt={product.title}
                  className="col-4 me-9 me-lg-3"
                  style={{ width: 80 }}
                />
                <div className="col-8">
                  <h6>{product.title}</h6>
                  <span className="d-block small opacity-50">
                    {product?.variants[0].name}
                  </span>
                </div>
              </div>
              {/* 商品數量 */}
              <div className="col-8 col-md-4 my-auto">
                <div className="input-group btn border-1 border-primary-600 bg-white p-2">
                  <div className="d-flex justify-content-between">
                    {/* 減號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={minusNum}
                      disabled={quantity <= 1}
                    >
                      <i className="bi bi-dash-lg fs-6"></i>
                    </button>
                    <div className="d-flex flex-column justify-content-center">
                      <input
                        type="text"
                        className="form-control border-0 text-center text-dark fw-semibold p-0"
                        value={quantity}
                        name="buyNumber"
                        readOnly
                      />

                      {/* 動態顯示庫存狀態 */}
                      <p className="form-text text-center fs-9 ls-10 m-0">
                        {selectedVariant?.stock >= 10
                          ? "數量充足"
                          : selectedVariant?.stock >= 1
                            ? `剩最後 ${selectedVariant.stock} 件`
                            : "暫無庫存"}
                      </p>
                    </div>
                    {/* 加號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={plusNum}
                      disabled={quantity >= selectedVariant?.stock}
                    >
                      <i className="bi bi-plus-lg fs-6"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* 小計 */}
              <div className="col-4 col-md-3 my-auto">
                <p className="fs-8 text-end mb-0">
                  {`NTD$ `}
                  <span className="fs-6">
                    {(selectedVariant?.price || 0) * quantity}
                  </span>
                </p>
              </div>
            </li>
            <li className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral">
              <div className="col-12 col-md-5 d-flex align-items-center justify-content-start">
                <img
                  src={productOne}
                  alt={product.title}
                  className="col-4 me-9 me-lg-3"
                  style={{ width: 80 }}
                />
                <div className="col-8">
                  <h6>{product.title}</h6>
                  <span className="d-block small opacity-50">
                    {product?.variants[0].name}
                  </span>
                </div>
              </div>
              {/* 商品數量 */}
              <div className="col-8 col-md-4 my-auto">
                <div className="input-group btn border-1 border-primary-600 bg-white p-2">
                  <div className="d-flex justify-content-between">
                    {/* 減號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={minusNum}
                      disabled={quantity <= 1}
                    >
                      <i className="bi bi-dash-lg fs-6"></i>
                    </button>
                    <div className="d-flex flex-column justify-content-center">
                      <input
                        type="text"
                        className="form-control border-0 text-center text-dark fw-semibold p-0"
                        value={quantity}
                        name="buyNumber"
                        readOnly
                      />

                      {/* 動態顯示庫存狀態 */}
                      <p className="form-text text-center fs-9 ls-10 m-0">
                        {selectedVariant?.stock >= 10
                          ? "數量充足"
                          : selectedVariant?.stock >= 1
                            ? `剩最後 ${selectedVariant.stock} 件`
                            : "暫無庫存"}
                      </p>
                    </div>
                    {/* 加號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={plusNum}
                      disabled={quantity >= selectedVariant?.stock}
                    >
                      <i className="bi bi-plus-lg fs-6"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* 小計 */}
              <div className="col-4 col-md-3 my-auto">
                <p className="fs-8 text-end mb-0">
                  {`NTD$ `}
                  <span className="fs-6">
                    {(selectedVariant?.price || 0) * quantity}
                  </span>
                </p>
              </div>
            </li>
            <li className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral">
              <div className="col-12 col-md-5 d-flex align-items-center justify-content-start">
                <img
                  src={productOne}
                  alt={product.title}
                  className="col-4 me-9 me-lg-3"
                  style={{ width: 80 }}
                />
                <div className="col-8">
                  <h6>{product.title}</h6>
                  <span className="d-block small opacity-50">
                    {product?.variants[0].name}
                  </span>
                </div>
              </div>
              {/* 商品數量 */}
              <div className="col-8 col-md-4 my-auto">
                <div className="input-group btn border-1 border-primary-600 bg-white p-2">
                  <div className="d-flex justify-content-between">
                    {/* 減號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={minusNum}
                      disabled={quantity <= 1}
                    >
                      <i className="bi bi-dash-lg fs-6"></i>
                    </button>
                    <div className="d-flex flex-column justify-content-center">
                      <input
                        type="text"
                        className="form-control border-0 text-center text-dark fw-semibold p-0"
                        value={quantity}
                        name="buyNumber"
                        readOnly
                      />

                      {/* 動態顯示庫存狀態 */}
                      <p className="form-text text-center fs-9 ls-10 m-0">
                        {selectedVariant?.stock >= 10
                          ? "數量充足"
                          : selectedVariant?.stock >= 1
                            ? `剩最後 ${selectedVariant.stock} 件`
                            : "暫無庫存"}
                      </p>
                    </div>
                    {/* 加號按鈕 */}
                    <button
                      type="button"
                      className="btn border-0 p-9"
                      onClick={plusNum}
                      disabled={quantity >= selectedVariant?.stock}
                    >
                      <i className="bi bi-plus-lg fs-6"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* 小計 */}
              <div className="col-4 col-md-3 my-auto">
                <p className="fs-8 text-end mb-0">
                  {`NTD$ `}
                  <span className="fs-6">
                    {(selectedVariant?.price || 0) * quantity}
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <div className="row justify-content-between p-3 py-lg-3 px-lg-4">
            <div className="col-12 col-lg-4 mb-9 mb-lg-0">
              <button
                type="button"
                className="btn btn-lg btn-outline-dark py-3 px-auto w-100"
              >
                <span className="fs-0">繼續逛逛</span>
              </button>
            </div>
            <div className="col-12 col-lg-4">
              <button
                type="button"
                className="btn btn-lg btn-outline-dark border-0 py-3 px-auto  w-100"
              >
                <i class="bi bi-trash3 me-2"></i>
                <span className="fs-0">清空購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        {/* 優惠券 box */}
        <div className="border mb-4">
          <div className="bg-neutral-100 bg-gradient py-3 ps-4">
            <p className="mb-0">優惠券</p>
          </div>
          <ul
            className="list-group rounded-0 list-group-checkable overflow-auto p-4"
            style={{ height: 382 }}
          >
            <li className="list-group-item border-1 d-flex justify-content-between mb-9">
              <label className="py-3" htmlFor="listGroupCheckableRadios1">
                <div>
                  <p className="mb-0">不使用優惠券</p>
                </div>
              </label>
              <input
                className="list-group-item-check"
                type="radio"
                name="listGroupCheckableRadios"
                id="listGroupCheckableRadios1"
                value=""
              />
            </li>
            <li className="list-group-item border-1 d-flex justify-content-between mb-9">
              <label className=" py-3" htmlFor="listGroupCheckableRadios2">
                <div>
                  <p className="mb-0">新會員限定｜開張好滋味</p>
                </div>
                <span className="d-block small opacity-50">
                  消費滿399，折抵99元
                </span>
              </label>
              <input
                className="list-group-item-check"
                type="radio"
                name="listGroupCheckableRadios"
                id="listGroupCheckableRadios2"
                value=""
              />
            </li>
            <li className="list-group-item border-1 d-flex justify-content-between mb-9">
              <label className=" py-3" htmlFor="listGroupCheckableRadios2">
                <div>
                  <p className="mb-0">新會員限定｜開張好滋味</p>
                </div>
                <span className="d-block small opacity-50">
                  消費滿399，折抵99元
                </span>
              </label>
              <input
                className="list-group-item-check"
                type="radio"
                name="listGroupCheckableRadios"
                id="listGroupCheckableRadios2"
                value=""
              />
            </li>
            <li className="list-group-item border-1 d-flex justify-content-between mb-9">
              <label className=" py-3" htmlFor="listGroupCheckableRadios2">
                <div>
                  <p className="mb-0">新會員限定｜開張好滋味</p>
                </div>
                <span className="d-block small opacity-50">
                  消費滿399，折抵99元
                </span>
              </label>
              <input
                className="list-group-item-check"
                type="radio"
                name="listGroupCheckableRadios"
                id="listGroupCheckableRadios2"
                value=""
              />
            </li>
          </ul>
        </div>
        {/* 訂單金額 box */}
        <div className="border">
          <div className="bg-neutral-100 bg-gradient py-3 ps-4">
            <p className="mb-0">訂單金額</p>
          </div>
          <ul className="list-unstyled mb-0 p-3 p-lg-4">
            <li className="d-flex justify-content-between py-2 mb-9">
              <p className="mb-0">商品總金額</p>
              <p className="mb-0">NTD$ {"1500"}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
              <p className="mb-0">
                運費<i class="bi bi-info-circle ms-9"></i>
              </p>
              <p className="mb-0">NTD$ {"300"}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
              <p className="mb-0">優惠券折扣</p>
              <p className="mb-0">-NTD$ {"99"}</p>
            </li>
            <li className="d-flex justify-content-between py-4 border-top">
              <h6 className="mb-0">總計</h6>
              <h6 className="mb-0">NTD$ {"1701"}</h6>
            </li>
          </ul>
        </div>
      </div>
      {/* 前往結帳按鈕 */}
      <div className="py-4">
        <button type="button" className="btn btn-dark w-100 py-3">
          <p className="m-auto ls-10 fw-medium">
            NTD$ {"1701"}
            <span className="mx-3">－</span>
            前往結帳
          </p>
        </button>
      </div>
    </section>
  );
}

export default CartStepOne;
