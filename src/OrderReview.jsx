// OrderReview.jsx
import React, { useState, useEffect } from "react";
import "./OrderReview.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "bootstrap";
import { useCart } from "./api/cartApiDate";

// images
import line from "./assets/images/checkOut/Line 1.png";
import GreenThree from "./assets/images/checkOut/Feature-number (3)1.png";
import outLineFour from "./assets/images/checkOut/Feature-number (4).png";
import fullOk from "./assets/images/checkOut/Feature-number (ok).png";

// const mockCart = [
//   {
//     id: 1,
//     quantity: 1,
//     product: {
//       title: "檸檬老醬蘿蔔",
//       price: 500,
//       image_url: "/src/assets/images/product/檸檬老醬蘿蔔.png",
//     },
//     variant: { name: "500ml 慢醃大罐", stock: 10 },
//   },
//   {
//     id: 2,
//     quantity: 2,
//     product: {
//       title: "煙燻蒜香小黃瓜",
//       price: 250,
//       image_url: "/src/assets/images/product/煙燻蒜香小黃瓜.png",
//     },
//     variant: { name: "200ml 慢醃迷你", stock: 5 },
//   },
// ];

// const totalPrice = mockCart.reduce(
//   (sum, item) => sum + item.product.price * item.quantity,
//   0,
// );
// const deliveryFee = 60;
// const discountAmount = 100;
// const orderTotal = totalPrice + deliveryFee - discountAmount;

function OrderReview() {
  const [discountAmount, setDiscountAmount] = useState(0);
  const { cart, totalPrice, deliveryFee } = useCart();
  const orderTotal = totalPrice + deliveryFee - discountAmount;
  // console.log(cart);
  // const cart = mockCart;
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    tooltipTriggerList.forEach((el) => new Tooltip(el));
  }, []);
  const navigate = useNavigate();

  const { state: orderData } = useLocation();

  if (!orderData) {
    navigate("/CheckOut/CartOrderForm");
    return null;
  }

  const invoiceTypeMap = {
    personal: "個人發票",
    company: "公司發票",
    // "": "未填寫",
  };

  const paymentMethodMap = {
  "信用卡": "信用卡",
  "貨到付款": "貨到付款",
  "ATM轉帳": "ATM 轉帳",
  "超商代碼繳費": "超商付款",
};


  return (
    <>
      <ul className="row justify-content-center align-items-center gx-1 gx-lg-4 mx-0 px-0 mx-lg-8 px-lg-8 my-6 my-lg-5 py-lg-5 list-unstyled">
        <li className="col text-center">
          <img src={fullOk} alt="oneStep" />
          <p className="pt-2">加入商品</p>
        </li>
        <li className="col pb-6 pb-md-6 pb-lg-4 mb-md-0 mb-lg-4">
          <img src={line} alt="line" className="px-2 px-lg-0" />
        </li>
        <li className="col text-center">
          <img src={fullOk} alt="twoStep" />
          <p className="pt-2">填寫訂單</p>
        </li>
        <li className="col pb-6 pb-md-6 pb-lg-4 mb-md-0 mb-lg-4">
          <img src={line} alt="line" className="px-2 px-lg-0" />
        </li>
        <li className="col text-center">
          <img src={GreenThree} alt="threeStep" />
          <p className="pt-2">確認訂單</p>
        </li>
        <li className="col pb-6 pb-md-6 pb-lg-4 mb-md-0 mb-lg-4">
          <img src={line} alt="line" className="px-2 px-lg-0" />
        </li>
        <li className="col text-center">
          <img src={outLineFour} alt="fourStep" />
          <p className="pt-2">完成訂單</p>
        </li>
      </ul>
      <div className="container my-4">
        <div className="row">
          {/* 左側：訂單項目 + 訂單總計 */}
          <div className="col-lg-6">
            {/* 訂單項目 */}
            <div className="border mb-4">
              <div className="bg-neutral-100 py-3 ps-4 mb-0">
                <p className="mb-0">{`訂單項目 (共 ${cart.length} 項)`}</p>
              </div>

              {cart.length === 0 ? (
                <div className="row justify-content-center py-8">
                  <div className="text-center">
                    <img
                      src="/src/assets/images/nullCart.png"
                      alt="購物車目前是空的"
                      className="mb-4"
                    />
                    <p className="mb-4">購物車目前是空的</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 px-4">
                    <Link
                      to="/allproducts"
                      className="btn btn-lg btn-dark py-3 w-100"
                    >
                      繼續逛逛
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-bottom border-neutral px-4 d-none d-md-block">
                    <ul className="row list-unstyled mb-0">
                      <li className="col-5 py-3">商品資訊</li>
                      <li className="col-4 py-3">商品數量</li>
                      <li className="col-3 py-3 text-end">小計</li>
                    </ul>
                  </div>

                  <ul className="list-unstyled mb-0 px-3 px-md-9">
                    {cart.map((cartItem) => (
                      <li
                        className="row py-3 py-lg-4 border-bottom border-neutral"
                        key={cartItem.id}
                      >
                        <div className="col-12 col-md-5 d-flex align-items-center">
                          <img
                            src={cartItem.product.image_url}
                            alt={cartItem.product.title}
                            className="me-3"
                            style={{ width: 80 }}
                          />
                          <div>
                            <h6>{cartItem.product.title}</h6>
                            <span className="d-block small opacity-50">
                              {cartItem.variant.name}
                            </span>
                          </div>
                        </div>

                        <div className="col-8 col-md-4 my-auto text-center">
                          {cartItem.quantity}
                        </div>

                        <div className="col-4 col-md-3 my-auto text-end">
                          NTD$ {cartItem.product.price * cartItem.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* 訂單總計 */}
            <div className="border mb-4">
              <div className="bg-neutral-100 py-3 ps-4">訂單總計</div>
              <ul className="list-unstyled mb-0 p-3 p-lg-4">
                <li className="d-flex justify-content-between py-2">
                  <p>商品總金額</p>
                  <p>NTD$ {totalPrice}</p>
                </li>
                <li className="d-flex justify-content-between py-2">
                  <p>
                    運費{" "}
                    <i
                      className="bi bi-info-circle ms-2"
                      data-bs-toggle="tooltip"
                      title="為了把最新鮮的風味送到你手中，我們僅提供低溫宅配到府。"
                    ></i>
                  </p>
                  <p>NTD$ {deliveryFee}</p>
                </li>
                <li className="d-flex justify-content-between py-2">
                  <p>優惠券折扣</p>
                  <p>-NTD$ {discountAmount}</p>
                </li>
                <li className="d-flex justify-content-between py-4 border-top">
                  <h6>總計</h6>
                  <h6>NTD$ {orderTotal}</h6>
                </li>
              </ul>
            </div>
          </div>

          {/* 右側：收件資訊 + 確認付款資訊 */}
          <div className="col-lg-6">
            {/* 收件資訊 */}
            <div className="border mb-4">
              <div className="bg-neutral-100 py-3 ps-4">確認收件資訊</div>
              <div className="p-3 p-lg-4">
                {[
                  ["收件者姓名", orderData?.receiverName],
                  ["手機號碼", orderData?.phone],
                  ["電子郵件", orderData?.email],
                  ["收貨地址", orderData?.address],
                  [
                    "發票類型",
                    invoiceTypeMap[orderData?.invoiceType] ??
                      orderData?.invoiceType,
                  ],
                  ["備註", orderData?.note ?? "無"],
                ].map(([label, value], idx) => (
                  <div className="row align-items-center mb-2" key={idx}>
                    <p className="col-4 mb-0">{label}</p>
                    <p className="col-8 mb-0">{value}</p>
                  </div>
                ))}

                {/* 收件說明 */}
                <div className="notice-box my-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <span className="fw-bold">說明</span>
                  </div>
                  <ul className="mb-0 ps-3">
                    <li>當商品送達您指定地址時，請確認商品是否正確。</li>
                    <li>
                      務必確認收件時段，多加留意陌生電話，以便物流順利將商品送到您手中。
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 付款資訊 */}
            <div className="border mb-4">
              <div className="bg-neutral-100 py-3 ps-4">確認付款資訊</div>
              <div className="p-3 p-lg-4">
                <div className="mb-2">
                  <div className="row align-items-center mb-2">
                    <p className="col-4">付款方式</p>
                    <p className="col-8">{paymentMethodMap[orderData?.paymentMethod] ?? orderData?.paymentMethod}</p>
                  </div>
                  {orderData?.paymentMethod === "信用卡" && (
                    <div className="row align-items-center mb-2">
                      <p className="col-4">卡號</p>
                      <p className="col-8">{orderData?.maskedCard}</p>
                    </div>
                  )}
                </div>

                {/* 付款注意事項 */}
                <div className="notice-box my-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <span className="fw-bold">注意事項</span>
                  </div>
                  <p className="mb-0">送出訂單後將立即進行信用卡扣款</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="d-flex flex-column flex-md-row justify-content-between mt-3 mb-3 gap-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-dark col-12 col-md-3"
          >
            返回上一步
          </button>
          <Link to="../OrderSuccess" className="btn btn-dark col-12 col-md-6">
            送出訂單
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderReview;
