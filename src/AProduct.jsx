import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { supabase } from "./lib/supabase.js";
import { addToCartApi, useCart } from "./api/carts.jsx";
import Breadcrumb from "./components/BreadCrumb";

function AProduct() {
  const { id } = useParams();
  // const id = "23d5e2f5-1bfb-4a3e-9348-dbc1c2a23b59";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 儲存選擇的商品規格
  const [selectedVariant, setSelectedVariant] = useState(null);
  // 儲存目前的購買數量 (預設為1)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // 取得單一產品 api
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, variants:product_variants(*)`)
        // 假設你的規格表名稱是 product_variants，這會執行「左連接」
        .eq("id", id)
        .single(); // 只拿一筆,加上 .single() 會直接回傳物件而非陣列

      if (!error && data) {
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
  // 數量增加
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

  // 加入購物車
  const { addToCart } = useCart();
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      addToCart({
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity: quantity,
      });
      // await addToCartApi({
      //   product_id: product.id,
      //   variant_id: selectedVariant.id,
      //   quantity: quantity,
      // });
      alert("成功加入購物車");
    } catch (error) {
      console.log(error);
      alert("加入購物車失敗");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>載入中...</p>;
  if (!product) return <p>找不到商品</p>;

  return (
    <main className="container">
      <Breadcrumb product={product} />
      {/* <!-- 商品簡介 --> */}
      <div className="row justify-content-center">
        <div className="col-md-5 d-none d-md-block">
          <img src={product.image_url} alt={product.title} />
        </div>
        <div className="col-md-5">
          <h1 className="h5 fs-md-3 mb-4">{product.title}</h1>
          <div className="mb-4">
            <p className="fs-8 text-neutral-600">{product.description}</p>
          </div>
          <div className="d-md-none product-mx-mobile mb-4 mx-md-0">
            <img src={product.image_url} alt={product.title} />
          </div>
          <div className="row d-md-none d-lg-flex">
            {/* <!-- 商品容量大小的選擇按鈕 --> */}
            {product?.variants?.map((variant) => (
              <div className="col-6" key={variant.id}>
                <button
                  type="button"
                  className={`w-100 btn btn-outline-primary variantBtn py-2 px-9 ${
                    selectedVariant?.id === variant.id
                      ? "text-white active" // 選中樣式
                      : "" // 未選中
                  }`}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                >
                  <div className="text-center">
                    <p className="btn-font-lg ls-10 mb-0">
                      {/* {variant.size} */}
                      <span className="d-md-inline-block">{variant.name}</span>
                    </p>
                    <p className="btn-font-sm ls-10 mb-0">
                      NTD${variant.price}
                    </p>
                  </div>
                </button>
              </div>
            ))}

            {/* <!-- 購買數量的控制按鈕 --> */}
            <div className="col-12 my-9">
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
            {/* <!-- 加入購物車 --> */}
            <div className="col-12">
              <button
                type="button"
                className="btn btn-dark w-100 py-3"
                onClick={handleAddToCart}
              >
                <p className="m-auto ls-10">
                  NTD$<span>${(selectedVariant?.price || 0) * quantity}</span>
                  <span className="mx-3">－</span>
                  加入購物車
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 按鈕們 - 只在平板大小時出現 --> */}
      <div className="d-none d-md-flex d-lg-none row justify-content-center mt-4">
        {/* <!-- 商品容量大小的選擇按鈕 --> */}
        {product?.variants?.map((variant) => (
          <div className="col-5" key={variant.id}>
            <button
              type="button"
              className={`w-100 btn btn-outline-primary variantBtn py-2 px-9 ${
                selectedVariant?.id === variant.id
                  ? "text-white active" // 選中樣式
                  : "" // 未選中
              }`}
              onClick={() => {
                setSelectedVariant(variant);
                setQuantity(1);
              }}
            >
              <div className="text-center">
                <p className="btn-font-lg ls-10 mb-0">
                  {variant.size}
                  <span className="d-md-inline-block">{variant.name}</span>
                </p>
                <p className="btn-font-sm ls-10 mb-0">NTD${variant.price}</p>
              </div>
            </button>
          </div>
        ))}

        {/* <!-- 購買數量的控制按鈕 --> */}
        <div className="col-10 my-9">
          <div className="input-group btn border-1 border-primary-600 bg-white p-2">
            <div className="d-flex justify-content-between">
              {/* 減號按鈕 */}
              <button
                type="button"
                className="btn border-0 p-9"
                onClick={minusNum}
              >
                <i className="bi bi-dash-lg fs-6"></i>
              </button>
              <div className="d-flex flex-column justify-content-center">
                <input
                  type="text"
                  className="form-control border-0 text-center text-dark fw-semibold p-0"
                  value={quantity}
                  id="buyNumber"
                  readOnly
                />

                <p className="form-text text-center fs-9 ls-10 m-0">數量充足</p>
              </div>
              {/* 加號按鈕 */}
              <button
                type="button"
                className="btn border-0 p-9"
                onClick={plusNum}
              >
                <i className="bi bi-plus-lg fs-6"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-10">
          <button type="button" className="btn btn-dark w-100 py-3">
            <p className="m-auto ls-10">
              NTD$<span>${(selectedVariant?.price || 0) * quantity}</span>
              <span className="mx-3">－</span>
              加入購物車
            </p>
          </button>
        </div>
      </div>
      {/* <!-- 詳細說明 --> */}
      <div className="row justify-content-center">
        <div className="col-md-10 py-8 product-mx-mobile mx-md-0">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item bg-primary-50 mb-4">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="product-accordion accordion-button bg-transparent collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <p className="btn-font-lg m-0">產品成分</p>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="fs-8 fw-bold ls-10 text-neutral-600">
                    {product.ingredients}
                    <br />
                    <br />
                    <span className="fw-bolder">過敏原資訊</span>
                    <br />
                    本產品不含常見過敏原（如小麥、堅果、牛奶、蛋類等），但製程環境可能接觸含有大豆、芝麻的食品，對相關食材過敏者請留意。
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-primary-50 mb-4">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="product-accordion accordion-button bg-transparent collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <p className="btn-font-lg m-0">產品產地</p>
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <ul className="fs-8 fw-bold ls-10 text-neutral-600">
                    {Object.keys(product.origin).map((key) => (
                      <li className="mb-2" key={key}>
                        {product.origin[key]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-primary-50">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="product-accordion accordion-button bg-transparent collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  <p className="btn-font-lg m-0">退換貨注意事項</p>
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <ul className="fs-8 fw-bold ls-10 text-neutral-600">
                    <li className="mb-2">
                      依《消費者保護法》規定，食品類商品屬於易腐敗、保存期限較短之商品，非商品瑕疵或配送錯誤恕無法辦理退換貨。
                    </li>
                    <li className="mb-2">
                      若商品有瑕疵或與訂單不符，請於收到商品當日拍照存證並於24小時內聯繫客服，我們將協助您更換或退款。
                    </li>
                    <li>
                      退換貨時，商品須保持完整包裝與附帶贈品，並以原包裝寄回。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AProduct;
