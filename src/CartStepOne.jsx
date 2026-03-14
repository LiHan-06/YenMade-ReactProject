import { useState, useEffect } from "react";
import { getCouponsApi, applyCouponApi } from "./api/getCoupons.js";
import { useAuth, useCart } from "./hooks/useAppContext";
import { Tooltip } from "bootstrap";
import { Link, useOutletContext } from "react-router";
// images
import line from "./assets/images/checkOut/Line 1.png";
import GreenOne from "./assets/images/checkOut/Feature-number (1).png";
import outLineTwo from "./assets/images/checkOut/Feature-number (2).png";
import outLineThree from "./assets/images/checkOut/Feature-number (3).png";
import outLineFour from "./assets/images/checkOut/Feature-number (4).png";
import nullCart from "./assets/images/Gemini Generated Image (3) 1.png";

function CartStepOne() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);

  const { discountAmount, setDiscountAmount } = useOutletContext();

  const {
    cart,
    fetchCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    deliveryFee,
  } = useCart();

  useEffect(() => {
    fetchCart();

    if (!user) return;

    const fetchCoupons = async () => {
      try {
        const couponData = await getCouponsApi();
        setCoupons(couponData || []);
      } catch (error) {
        console.error("抓優惠券失敗", error);
      }
    };

    fetchCoupons();
  }, [user, fetchCart]);

  const orderTotal =
    (Number(totalPrice) || 0) +
    (Number(deliveryFee) || 0) -
    (Number(discountAmount) || 0);
  // 套用優惠券
  const handleCouponChange = async (e) => {
    const coupon_code = e.target.value;

    if (coupon_code === "noneToUse") {
      setDiscountAmount(0);
      return;
    }

    const coupon = coupons.find((c) => c.code === coupon_code);
    if (!coupon) return;

    const minAmount = Number(coupon.min_purchase ?? 0);

    if (totalPrice >= minAmount) {
      try {
        const discount = await applyCouponApi({
          user_id: user.id,
          coupon_code,
          session: user,
        });
        setDiscountAmount(discount || 0);
        // console.log("套用折扣:", discount);
      } catch (error) {
        console.error("套用優惠券失敗", error);
      }
    } else {
      setDiscountAmount(0);
      alert(`${coupon.title} 需滿 ${minAmount} 元才可使用`);
      // 重置 radio 選項 (對使用者體驗較好)
      e.target.checked = false;
    }
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    const tooltips = Array.from(tooltipTriggerList).map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl),
    );
    // 清理 Tooltip 以免造成記憶體洩漏
    return () => tooltips.forEach((t) => t.dispose());
  }, []);

  return (
    <>
      <ul className="row justify-content-center align-items-center gx-1 gx-lg-4 mx-0 px-0 mx-lg-8 px-lg-8 my-6 my-lg-5 py-lg-5 list-unstyled">
        <li className="col text-center">
          <img src={GreenOne} alt="oneStep" />
          <p className="pt-2">加入商品</p>
        </li>
        <li className="col pb-6 pb-md-6 pb-lg-4 mb-md-0 mb-lg-4">
          <img src={line} alt="line" className="px-2 px-lg-0" />
        </li>
        <li className="col text-center">
          <img src={outLineTwo} alt="twoStep" />
          <p className="pt-2">填寫訂單</p>
        </li>
        <li className="col pb-6 pb-md-6 pb-lg-4 mb-md-0 mb-lg-4">
          <img src={line} alt="line" className="px-2 px-lg-0" />
        </li>
        <li className="col text-center">
          <img src={outLineThree} alt="threeStep" />
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
      <section className="row" id="stepOne">
        <div className="col-lg-8">
          <div className="border">
            <div className="bg-neutral-100 py-3 ps-4 mb-0">
              <p className="mb-0">{`購物車 (共 ${cart.length} 項)`}</p>
            </div>

            {cart.length === 0 ? (
              <div className="row justify-content-center py-8">
                <div className="text-center">
                  <img src={nullCart} alt="購物車目前是空的" className="mb-4" />
                  <p className="mb-4">購物車目前是空的</p>
                </div>
                <div className="col-md-6 col-lg-4 px-4">
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
                    <li className="col-6 py-3">商品資訊</li>
                    <li className="col-3 py-3">商品數量</li>
                    <li className="col-3 py-3 text-end">小計</li>
                  </ul>
                </div>

                <ul className="list-unstyled mb-0 px-9">
                  {cart.map((cartItem) => (
                    <li
                      className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral position-relative"
                      key={cartItem.id}
                    >
                      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-start mb-2 mb-md-0">
                        <img
                          src={cartItem.product?.image_url}
                          alt={cartItem.product?.title}
                          className="me-3"
                          style={{ width: 100 }}
                        />
                        <div>
                          <h6>{cartItem.product?.title}</h6>
                          <span className="d-block small opacity-50">
                            {cartItem.variant?.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-7 col-md-3 col-lg-4 my-auto">
                        <div className="input-group border border-primary-600 bg-white p-2">
                          <div className="d-flex justify-content-between w-100">
                            <button
                              type="button"
                              className="btn border-0 p-1"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity - 1,
                                )
                              }
                              disabled={cartItem.quantity <= 1}
                            >
                              <i className="bi bi-dash-lg fs-6"></i>
                            </button>
                            <div className="text-center">
                              <input
                                type="text"
                                className="form-control border-0 text-center text-dark fw-semibold p-0"
                                value={cartItem.quantity}
                                readOnly
                              />
                              <p className="form-text text-center fs-9 ls-10 m-0">
                                {cartItem.variant?.stock >= 10
                                  ? "數量充足"
                                  : cartItem.variant?.stock >= 1
                                    ? `剩最後 ${cartItem.variant?.stock} 件`
                                    : "暫無庫存"}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn border-0 p-1"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity + 1,
                                )
                              }
                              disabled={
                                cartItem.quantity >= cartItem.variant?.stock
                              }
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-5 col-md-3 my-auto text-end h6">
                        NTD${" "}
                        {(Number(cartItem.product?.price) || 0) *
                          cartItem.quantity}
                      </div>
                      <div className="my-auto">
                        <button
                          type="button"
                          className="btn btn-sm p-2 position-absolute top-0 end-0"
                          onClick={() => removeItem(cartItem.id)}
                        >
                          <i class="bi bi-x-lg text-danger"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="row justify-content-between p-3 py-lg-3 px-lg-4">
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <Link
                      to="/allproducts"
                      className="btn btn-lg btn-outline-dark py-3 w-100"
                    >
                      <span className="fs-0">繼續逛逛</span>
                    </Link>
                  </div>
                  <div className="col-lg-4">
                    <button
                      type="button"
                      className="btn btn-lg btn-outline-dark border-0 py-3 w-100"
                      onClick={() => clearCart()}
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
          <div className="border mb-4">
            <div className="bg-neutral-100 py-3 ps-4">優惠券</div>
            {user ? (
              <ul
                className="list-group rounded-0 overflow-auto p-4"
                style={{ maxHeight: 382 }}
              >
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
                  <label className="flex-grow-1 py-2 cursor-pointer">
                    不使用優惠券
                    <input
                      className="form-check-input float-end"
                      type="radio"
                      name="couponGroup"
                      value="noneToUse"
                      onChange={handleCouponChange}
                      defaultChecked
                    />
                  </label>
                </li>
                {coupons.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center mb-2"
                    key={item.id}
                  >
                    <label className="flex-grow-1 py-2 cursor-pointer">
                      <p className="mb-0 fw-bold">{item.title}</p>
                      <small className="text-muted">{item.description}</small>
                      <input
                        className="form-check-input float-end"
                        type="radio"
                        name="couponGroup"
                        value={item.code}
                        onChange={handleCouponChange}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted mb-3">請先登入才能使用優惠券</p>
                <Link to="/SignIn" className="btn btn-outline-dark">
                  立即登入
                </Link>
              </div>
            )}
          </div>

          <div className="border">
            <div className="bg-neutral-100 py-3 ps-4">訂單金額</div>
            <ul className="list-unstyled mb-0 p-3 p-lg-4">
              <li className="d-flex justify-content-between py-2">
                <p className="mb-0">商品總金額</p>
                <p className="mb-0">NTD$ {totalPrice}</p>
              </li>
              <li className="d-flex justify-content-between py-2">
                <p className="mb-0">
                  運費{" "}
                  <i
                    className="bi bi-info-circle ms-1"
                    data-bs-toggle="tooltip"
                    title="為了把最新鮮的風味送到你手中，我們僅提供低溫宅配到府。"
                  ></i>
                </p>
                <p className="mb-0">NTD$ {deliveryFee}</p>
              </li>
              <li className="d-flex justify-content-between py-2">
                <p className="mb-0">優惠券折扣</p>
                <p className="mb-0">-NTD$ {discountAmount}</p>
              </li>
              <li className="d-flex justify-content-between py-4 border-top mt-3">
                <h6 className="mb-0">總計</h6>
                <h6 className="mb-0 fw-bold">NTD$ {orderTotal}</h6>
              </li>
            </ul>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="py-4">
            <Link to="CartOrderForm" className="btn btn-dark w-100 py-3 fs-5">
              前往結帳 NTD$ {orderTotal}
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default CartStepOne;
