  import { useState, useEffect } from "react";
  import { getCouponsApi, applyCouponApi } from "./api/getCoupons.js";
  import {
    updateCartQuantityApi,
    deleteCartItemApi,
    clearCartApi,
    useCart,
  } from "./api/cartApiDate.jsx";
  import { Link } from "react-router";

  import nullCart from "./assets/images/Gemini Generated Image (3) 1.png";

  function CartStepOne(userId) {
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    const { cart, fetchCart, cartCount, updateQuantity, removeFromCart } =
      useCart();
    useEffect(() => {
      fetchCart();
      const fetchCoupons = async () => {
        try {
          const couponData = await getCouponsApi();
          setCoupons(couponData || []);
          // console.log("取得優惠券成功", coupons);
        } catch (error) {
          // console.error("取得優惠券失敗", error);
        }
      };
      fetchCoupons();
    }, []);

    // 優惠券事件監聽
      const handleCouponChange = async (e) => {
        const coupon_code = e.target.value;

        if (coupon_code === "noneToUse") {
          setDiscountAmount(0);
          setSelectedCoupon(null);
          return;
        }

        // 先找到被選中的優惠券資訊
        const coupon = coupons.find((c) => c.code === coupon_code);
        setSelectedCoupon(coupon);

        if (!coupon) return;

        // 判斷是否達到使用門檻
        if (totalPrice >= coupon.minimum_amount) {
          // 如果達標，套用折扣
          const discount = await applyCouponApi({
            user_id: cart?.[0]?.user_id,
            coupon_code,
          });

          setDiscountAmount(discount || 0);
          console.log("套用折扣:", discount);
        } else {
          // 未達標，不套用折扣
          setDiscountAmount(0);
          alert(`${coupon.title} 需滿 ${coupon.min_purchase} 元才可使用`);
        }
      };

    // 商品總金額
    const totalPrice = cart.reduce((sum, cartItem) => sum + cartItem.subtotal, 0);
    // 運費
    const deliveryFee = 300;
    // 訂單總金額
    const orderTotal = totalPrice + deliveryFee - discountAmount;

    return (
      <section className="row" id="stepOne">
        {/* 購買清單 */}
        <div className="col-lg-8">
          <div className="border">
            {/* box head */}
            <div className="bg-neutral-100 py-3 ps-4 mb-0">
              <p className="mb-0">{`購物車 (共 ${cart.length} 項)`}</p>
            </div>
            {/* table head */}
            {cart.length === 0 ? (
              <div className="row justify-content-center py-8">
                <div className="text-center">
                  <img
                    src={nullCart}
                    alt="購物車目前是空的"
                    className="mb-4"
                    // style={{ width: 80 }}
                  />
                  <p className="mb-4">購物車目前是空的</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 px-4">
                  <Link
                    to="/allproducts"
                    className="btn btn-lg btn-dark py-3 px-auto w-100"
                  >
                    <p className="fs-0 mb-0">繼續逛逛</p>
                  </Link>
                </div>
              </div>
            ) : (
              <>
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

                  {cart.map((cartItem) => (
                    <li
                      className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral"
                      key={cartItem.id}
                    >
                      <div className="col-12 col-md-5 d-flex align-items-center justify-content-start">
                        <img
                          src={cartItem.image_url}
                          alt={cartItem.title}
                          className="col-4 me-9 me-lg-3"
                          style={{ width: 80 }}
                        />
                        <div className="col-8">
                          <h6>{cartItem.title}</h6>
                          <span className="d-block small opacity-50">
                            {cartItem.variant_name}
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
                              onClick={() =>
                                updateQuantity(cartItem.id, cartItem.quantity - 1)
                              }
                              disabled={cartItem.quantity <= 1}
                            >
                              <i className="bi bi-dash-lg fs-6"></i>
                            </button>
                            <div className="d-flex flex-column justify-content-center">
                              <input
                                type="text"
                                className="form-control border-0 text-center text-dark fw-semibold p-0"
                                value={cartItem.quantity}
                                name="buyNumber"
                              />

                              {/* 動態顯示庫存狀態 */}
                              <p className="form-text text-center fs-9 ls-10 m-0">
                                {cartItem.stock >= 10
                                  ? "數量充足"
                                  : cartItem.stock >= 1
                                    ? `剩最後 ${cartItem.stock} 件`
                                    : "暫無庫存"}
                              </p>
                            </div>
                            {/* 加號按鈕 */}
                            <button
                              type="button"
                              className="btn border-0 p-9"
                              onClick={() =>
                                updateQuantity(cartItem.id, cartItem.quantity + 1)
                              }
                              disabled={cartItem.quantity >= cartItem.stock}
                            >
                              <i className="bi bi-plus-lg fs-6"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* 小計 */}
                      <div className="col-4 col-md-3 my-auto">
                        <p className="fs-8 text-end mb-0">
                          NTD$
                          <span className="fs-6">{cartItem.subtotal}</span>
                        </p>
                      </div>
                      {/* 刪除按鈕 */}
                      <div className="col-12 d-md-none">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger w-100"
                          onClick={() => removeFromCart(cartItem.id)}
                        >
                          <i className="bi bi-trash3 me-2"></i>
                          移除
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="row justify-content-between p-3 py-lg-3 px-lg-4">
                  <div className="col-12 col-lg-4 mb-9 mb-lg-0">
                    <Link
                      to="/allproducts"
                      className="btn btn-lg btn-outline-dark py-3 px-auto w-100"
                    >
                      <p className="fs-0 mb-0">繼續逛逛</p>
                    </Link>
                  </div>
                  <div className="col-12 col-lg-4">
                    <button
                      type="button"
                      className="btn btn-lg btn-outline-dark border-0 py-3 px-auto  w-100"
                      onClick={() => {
                        clearCartApi(cart.user_id);
                      }}
                    >
                      <i className="bi bi-trash3 me-2"></i>
                      <span className="fs-0">清空購物車</span>
                    </button>
                  </div>
                </div>
              </>
            )}
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
                  className="list-group-item-check coupon-radio"
                  type="radio"
                  name="listGroupCheckableRadios"
                  value="noneToUse"
                  onChange={handleCouponChange}
                />
              </li>
              {coupons.map((item) => (
                <li
                  className="list-group-item border-1 d-flex justify-content-between mb-9"
                  key={item.id}
                >
                  <label className=" py-3" htmlFor={item.code}>
                    <div>
                      <p className="mb-0">{item.title}</p>
                    </div>
                    <span className="d-block small opacity-50">
                      {item.description}
                    </span>
                  </label>
                  <input
                    className="list-group-item-check coupon-radio"
                    type="radio"
                    name="listGroupCheckableRadios"
                    value={item.code}
                    onChange={handleCouponChange}
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* 訂單金額 box */}
          <div className="border">
            <div className="bg-neutral-100 bg-gradient py-3 ps-4">
              <p className="mb-0">訂單金額</p>
            </div>
            <ul className="list-unstyled mb-0 p-3 p-lg-4">
              {/* 商品總金額 */}
              <li className="d-flex justify-content-between py-2 mb-9">
                <p className="mb-0">商品總金額</p>
                <p className="mb-0">NTD$ {totalPrice}</p>
              </li>

              {/* 運費 */}
              <li className="d-flex justify-content-between py-2 mb-9">
                <p className="mb-0">
                  運費<i className="bi bi-info-circle ms-9"></i>
                </p>
                <p className="mb-0">NTD$ {deliveryFee}</p>
              </li>

              {/* 優惠券折扣 */}
              <li className="d-flex justify-content-between py-2 mb-9">
                <p className="mb-0">優惠券折扣</p>
                <p className="mb-0">
                  -NTD$ {discountAmount}
                </p>
              </li>

              {/* 總計 */}
              <li className="d-flex justify-content-between py-4 border-top">
                <h6 className="mb-0">總計</h6>
                <h6 className="mb-0">NTD$ {orderTotal}</h6>
              </li>
            </ul>
          </div>
        </div>
        {/* 前往結帳按鈕 */}
        <div className="py-4">
          {cart.length === 0 ? (
            ""
          ) : (
            <Link to={"OrderReview"} className="btn btn-dark w-100 py-3">
              <p className="m-auto ls-10 fw-medium">
                NTD$ ${orderTotal}
                <span className="mx-3">－</span>
                前往結帳
              </p>
            </Link>
          )}
        </div>
      </section>
    );
  }

  export default CartStepOne;
