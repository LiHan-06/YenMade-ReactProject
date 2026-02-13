import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";
import { useCart, clearCartApi } from "./api/carts.jsx";
import { Link, NavLink } from "react-router";

import nullCart from "./assets/images/Gemini Generated Image (3) 1.png";

function CartStepOne() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  console.log(cart);
  // 商品總金額
  const totalPrice = cart.reduce((sum, cartItem) => sum + cartItem.subtotal, 0);
  // 運費
  const deliveryFee = 300;
  // 訂單總金額
  const orderTotal = totalPrice + deliveryFee - 99;

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
                <button
                  type="button"
                  className="btn btn-lg btn-dark py-3 px-auto w-100"
                >
                  <Link to="AllProduct" className="fs-0">
                    繼續逛逛
                  </Link>
                </button>
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
              <p className="mb-0">{`NTD$ ${totalPrice}`}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
              <p className="mb-0">
                運費<i className="bi bi-info-circle ms-9"></i>
              </p>
              <p className="mb-0">{`NTD$ ${deliveryFee}`}</p>
            </li>
            <li className="d-flex justify-content-between py-2 mb-9">
              <p className="mb-0">優惠券折扣</p>
              <p className="mb-0">-NTD$ {"99"}</p>
            </li>
            <li className="d-flex justify-content-between py-4 border-top">
              <h6 className="mb-0">總計</h6>
              <h6 className="mb-0">NTD$ ${totalPrice}</h6>
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
