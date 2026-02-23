import { useState, useEffect } from "react";
import { getCouponsApi, applyCouponApi } from "./api/getCoupons.js";
import { useCart } from "./api/cartApiDate.jsx";
import { useAuth } from "./context/AuthContext";
import { Tooltip } from "bootstrap";
import { Link } from "react-router";

import nullCart from "./assets/images/Gemini Generated Image (3) 1.png";

function CartStepOne() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { cart, fetchCart, addToCart, updateQuantity, removeItem } = useCart();

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
  }, [user]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.product?.price) || 0) * Number(item.quantity),
    0
  );
  const deliveryFee = 300;
  const orderTotal = totalPrice + deliveryFee - discountAmount;

  // 套用優惠券
  const handleCouponChange = async (e) => {
    const coupon_code = e.target.value;

    if (coupon_code === "noneToUse") {
      setDiscountAmount(0);
      setSelectedCoupon(null);
      return;
    }

    const coupon = coupons.find((c) => c.code === coupon_code);
    if (!coupon) return;

    setSelectedCoupon(coupon);

    const minAmount = Number(coupon.min_purchase ?? 0);

    if (totalPrice >= minAmount) {
      // 帶入 session 才能授權呼叫 Edge Function
      const discount = await applyCouponApi({ user_id: user.id, coupon_code, session: user });
      setDiscountAmount(discount || 0);
      console.log("套用折扣:", discount);
    } else {
      setDiscountAmount(0);
      alert(`${coupon.title} 需滿 ${minAmount} 元才可使用`);
    }
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, []);

  const handleAddToCart = async (product_id, variant_id, quantity = 1) => {
    try {
      await addToCart({ product_id, variant_id, quantity });
      fetchCart();
    } catch (error) {
      console.error("加入購物車失敗:", error.message);
    }
  };

  return (
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
              <div className="col-12 col-md-6 col-lg-4 px-4">
                <Link to="/allproducts" className="btn btn-lg btn-dark py-3 w-100">
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

              <ul className="list-unstyled mb-0 px-9">
                {cart.map((cartItem) => (
                  <li className="row py-3 py-lg-4 px-3 px-md-9 border-bottom border-neutral" key={cartItem.id}>
                    <div className="col-12 col-md-5 d-flex align-items-center">
                      <img src={cartItem.product?.image_url} alt={cartItem.product?.title} className="me-3" style={{ width: 80 }} />
                      <div>
                        <h6>{cartItem.product?.title}</h6>
                        <span className="d-block small opacity-50">{cartItem.variant?.name}</span>
                      </div>
                    </div>

                    <div className="col-8 col-md-4 my-auto">
                      <div className="input-group border border-primary-600 bg-white p-2">
                        <button type="button" className="btn border-0" onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} disabled={cartItem.quantity <= 1}>
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <div className="d-flex flex-column justify-content-center">
                          <input type="text" className="form-control border-0 text-center fw-semibold" value={cartItem.quantity} readOnly />
                          <p className="form-text text-center small m-0">
                            {cartItem.variant?.stock >= 10 ? "數量充足" : cartItem.variant?.stock >= 1 ? `剩最後 ${cartItem.variant?.stock} 件` : "暫無庫存"}
                          </p>
                        </div>
                        <button type="button" className="btn border-0" onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} disabled={cartItem.quantity >= cartItem.variant?.stock}>
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-4 col-md-3 my-auto text-end">
                      NTD$ {(Number(cartItem.product?.price) || 0) * cartItem.quantity}
                    </div>

                    <div className="col-12 d-md-none mt-2">
                      <button type="button" className="btn btn-sm btn-outline-danger w-100" onClick={() => removeItem(cartItem.id)}>
                        <i className="bi bi-trash3 me-2"></i>移除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="col-lg-4">
        <div className="border mb-4">
          <div className="bg-neutral-100 bg-gradient py-3 ps-4">優惠券</div>

          {user ? (
            <ul className="list-group rounded-0 list-group-checkable overflow-auto p-4" style={{ height: 382 }}>
              <li className="list-group-item border-1 d-flex justify-content-between mb-9">
                <label className="py-3">不使用優惠券</label>
                <input className="list-group-item-check coupon-radio" type="radio" name="listGroupCheckableRadios" value="noneToUse" onChange={handleCouponChange} />
              </li>

              {coupons.map((item) => (
                <li className="list-group-item border-1 d-flex justify-content-between mb-9" key={item.id}>
                  <label className="py-3">
                    <p className="mb-0">{item.title}</p>
                    <span className="d-block small opacity-50">{item.description}</span>
                  </label>
                  <input className="list-group-item-check coupon-radio" type="radio" name="listGroupCheckableRadios" value={item.code} onChange={handleCouponChange} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center">
              <p className="text-muted mb-3">請先登入才能使用優惠券</p>
              <Link to="/SignIn" className="btn btn-outline-dark">立即登入</Link>
            </div>
          )}
        </div>

        <div className="border">
          <div className="bg-neutral-100 bg-gradient py-3 ps-4">訂單金額</div>
          <ul className="list-unstyled mb-0 p-3 p-lg-4">
            <li className="d-flex justify-content-between py-2 mb-9">
              <p>商品總金額</p>
              <p>NTD$ {totalPrice}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
              <p>運費 <i className="bi bi-info-circle ms-2" data-bs-toggle="tooltip" title="為了把最新鮮的風味送到你手中，我們僅提供低溫宅配到府。"></i></p>
              <p>NTD$ {deliveryFee}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
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

      {cart.length > 0 && (
        <div className="py-4">
          <Link to="OrderReview" className="btn btn-dark w-100 py-3">
            前往結帳 NTD$ {orderTotal}
          </Link>
        </div>
      )}
    </section>
  );
}

export default CartStepOne;