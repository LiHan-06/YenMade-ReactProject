import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUserById } from "./api/users.js";
import { Tooltip } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

const PAYMENT = {
  COD: "貨到付款",
  CREDIT: "信用卡",
  ATM: "ATM轉帳",
  CVS: "超商代碼繳費",
};

export default function CartOrderForm({ onPrev, onNext }) {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT.CREDIT);

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 16 }, (_, i) => String(now + i));
  }, []);

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      sameAsBuyer: false,
      receiverName: "",
      phone: "",
      email: "",
      address: "",
      invoiceType: "",
      note: "",
      terms: false,

      // credit card fields
      cardNumber: "",
      expYear: "",
      expMonth: "",
      cvc: "",
      cardLastName: "",
      cardFirstName: "",
    },
  });

  const sameAsBuyer = watch("sameAsBuyer");
  // 勾選「同寄件人」時打 API
  useEffect(() => {
    if (!sameAsBuyer) {
      // 取消勾選 → 清空欄位
      setValue("receiverName", "");
      setValue("phone", "");
      setValue("email", "");
      setValue("address", "");
      return;
    }

    const fillBuyerData = async () => {
      // 1. 從 Supabase 拿 user.id
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user:", user); // 先確認有沒有拿到 user
      if (!user) return;

      // 2. 打 API 拿會員資料
      const profile = await getUserById(user.id);
      console.log("profile:", profile); // ← 加這行，看實際回傳什麼欄位
      // 3. 填入表單（對應你的欄位）
      setValue("receiverName", profile.full_name ?? "");
      setValue("phone", profile.phone ?? "");
      setValue("email", profile.email ?? "");
      setValue("address", profile.address ?? "");
    };

    fillBuyerData();
  }, [sameAsBuyer]);

  const inputBase =
    "form-control border-0 p-3 bg-neutral-50 text-neutral-400 fs-8 fw-medium"; // 灰底 + 文字 muted
  const selectBase =
    "form-select border-0 p-3 bg-neutral-50 text-dark fs-8 fw-medium"; // 灰底 + 文字 muted
  const labelBase = "form-label small text-dark fw-medium";
  const headerBar = "ps-4 py-3 fw-semibold bg-neutral-100 "; // 表頭灰底

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const {
      cardNumber,
      cvc,
      expYear,
      expMonth,
      cardLastName,
      cardFirstName,
      ...safeData
    } = data;
    const maskedCard = cardNumber
      ? `**** **** **** ${cardNumber.slice(-4)}`
      : "";
    const payload = {
      ...safeData,
      paymentMethod,
      maskedCard,
    };
    console.log("order form", payload);
    navigate("/CheckOut/OrderReview", { state: payload }); // 對應你的路由路徑
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container pb-4 px-md-6">
        <div className="text-center mb-5 d-none d-md-block">
          {/* <h1 className="text-center pb-5 pt-8 mb-0">購物車</h1> */}
          <img
            src="/src/assets/images/Progress-Bar.svg"
            className="mb-5 pt-5 mt-4"
            alt=""
          />
        </div>
        {/* RWD：手機版進度條換圖，標題改小一點，並且整個區塊改為 d-md-none（md以下顯示） */}
        <div className="text-center mb-5 px-1 d-md-none d-block">
          {/* <h2 className="text-center pb-4 pt-5 mb-0">購物車</h2> */}
          <img
            src="/src/assets/images/Progress-Bar-rwd.svg"
            className="img-fluid w-100"
            alt=""
          />
        </div>
        <div className="row g-4 bg-white mt-5">
          {/* 左：收件資訊 */}
          <div className="col-lg-6 my-0 mb-md-8 mb-4">
            <div className="border bg-white ">
              <div
                className={` d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between ${headerBar}`}
              >
                <p className="mb-0 ">收件資訊</p>
                <span className=" text-neutral-600 fs-9 fw-medium pe-4 mt-1 mt-lg-0">
                  ⓘ 為了把最新鮮的風味送到你手中，我們僅提供低溫宅配到府
                </span>
              </div>

              <div className="p-4">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sameAsBuyer"
                    {...register("sameAsBuyer")}
                  />
                  <label
                    className="form-check-label fs-8 fw-medium"
                    htmlFor="sameAsBuyer"
                  >
                    同寄件人
                  </label>
                </div>

                {/* 收件者姓名 */}
                <div className="mb-4">
                  <label className={`${labelBase} `} htmlFor="receiverName">
                    收件者姓名
                  </label>
                  <input
                    id="receiverName"
                    type="text"
                    className={`bg-secondary ${inputBase} ${errors.receiverName ? "is-invalid" : ""}`}
                    placeholder="請輸入姓名"
                    {...register("receiverName", {
                      required: "請輸入收件者姓名",
                      minLength: { value: 2, message: "姓名至少 2 個字" },
                    })}
                  />
                  {errors.receiverName && (
                    <div className="invalid-feedback">
                      {errors.receiverName.message}
                    </div>
                  )}
                </div>

                {/* 手機 */}
                <div className="mb-4">
                  <label className={labelBase} htmlFor="phone">
                    手機號碼
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`${inputBase} ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="請輸入手機號碼"
                    {...register("phone", {
                      required: "請輸入手機號碼",
                      pattern: {
                        value: /^09\d{8}$/,
                        message: "手機格式不正確（例：0912345678）",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className={labelBase} htmlFor="email">
                    電子郵件
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`${inputBase} ${errors.email ? "is-invalid" : ""}`}
                    placeholder="請輸入電子郵件"
                    {...register("email", {
                      required: "請輸入電子郵件",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* 地址 */}
                <div className="mb-4">
                  <label className={labelBase} htmlFor="address">
                    收貨地址
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={`${inputBase} ${errors.address ? "is-invalid" : ""}`}
                    placeholder="請輸入收件地址"
                    {...register("address", {
                      required: "請輸入收貨地址",
                      minLength: { value: 6, message: "地址太短" },
                    })}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>

                {/* 發票 */}
                <div className="mb-4">
                  <label className={labelBase} htmlFor="invoiceType">
                    發票類型
                  </label>

                  <select
                    id="invoiceType"
                    className={`${selectBase} ${errors.invoiceType ? "is-invalid" : ""}`}
                    {...register("invoiceType", { required: "請選擇發票類型" })}
                  >
                    <option value="">請選擇發票類型</option>
                    <option value="personal">個人電子發票</option>
                    <option value="company">公司用(統編)</option>
                  </select>

                  {errors.invoiceType && (
                    <div className="invalid-feedback">
                      {errors.invoiceType.message}
                    </div>
                  )}
                </div>

                {/* 備註 */}
                <div className="">
                  <label className={labelBase} htmlFor="note">
                    備註
                  </label>
                  <textarea
                    id="note"
                    className={`${inputBase}`}
                    rows={2}
                    placeholder="管理室代收/電話聯絡時間"
                    {...register("note")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右：付款方式 */}
          <div className="col-lg-6  my-0 mb-md-0 mb-6">
            <div className="border bg-white">
              <div className={headerBar}>
                <p className="mb-0">付款方式</p>
              </div>

              <div className="p-4">
                <ul
                  className="nav nav-tabs w-100 mb-4 ym-pay-tabs d-none d-md-flex"
                  role="tablist"
                >
                  {Object.values(PAYMENT).map((label) => {
                    const active = paymentMethod === label;

                    return (
                      <li
                        className="nav-item  text-center"
                        role="presentation"
                        key={label}
                      >
                        <button
                          type="button"
                          role="tab"
                          className={`nav-link py-2 w-100 fs-8 fw-medium w-100 ${active ? "active text-white" : "text-dark"}`}
                          aria-selected={active ? "true" : "false"}
                          onClick={() => setPaymentMethod(label)}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {/* 手機：radio list（md以下顯示） */}
                <div className="d-md-none mb-4 border rounded bg-primary-50 p-2">
                  {Object.values(PAYMENT).map((label) => (
                    <label
                      key={label}
                      className="d-flex bg-primary-50 gap-3 px-3 py-3 rounded mb-1 cursor-pointer"
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                    >
                      <input
                        type="radio"
                        name="paymentMethodMobile"
                        value={label}
                        checked={paymentMethod === label}
                        onChange={() => setPaymentMethod(label)}
                        className="form-check-input mt-0"
                        style={{
                          width: "1.25rem",
                          height: "1.25rem",
                          accentColor: "#9BA37E",
                        }}
                      />
                      <span className="fs-8 fw-medium text-dark">{label}</span>
                    </label>
                  ))}
                </div>

                {/* 信用卡欄位 */}
                {paymentMethod === PAYMENT.CREDIT && (
                  <div>
                    <label className={`${labelBase} d-block`}>
                      支援卡片種類
                    </label>
                    <div className="mb-4">
                      <img
                        src="/src/assets/images/creditCard/MasterCard.svg"
                        alt="MasterCard"
                        className="pe-2"
                      />
                      <img
                        src="/src/assets/images/creditCard/Visa.svg"
                        alt="VISA"
                        className="pe-2"
                      />

                      <img
                        src="/src/assets/images/creditCard/JCB.svg"
                        alt="JCB"
                      />
                    </div>

                    <div className="mb-4">
                      <label className={labelBase} htmlFor="cardNumber">
                        信用卡卡號
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        className={`${inputBase} ${errors.cardNumber ? "is-invalid" : ""}`}
                        placeholder="請輸入信用卡卡號"
                        {...register("cardNumber", {
                          required: "請輸入卡號",
                          pattern: {
                            value: /^\d{13,19}$/,
                            message: "卡號需為 13–19 位數字",
                          },
                        })}
                      />
                      {errors.cardNumber && (
                        <div className="invalid-feedback">
                          {errors.cardNumber.message}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className={labelBase}>有效日期</label>
                        <div className="d-flex gap-3">
                          <select
                            className={`${selectBase} ${errors.expYear ? "is-invalid" : ""}`}
                            {...register("expYear", { required: "請選年份" })}
                          >
                            <option value="">年份</option>
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>

                          <select
                            className={`${selectBase} ${errors.expMonth ? "is-invalid" : ""}`}
                            {...register("expMonth", { required: "請選月份" })}
                          >
                            <option value="">月份</option>
                            {months.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>

                        {(errors.expYear || errors.expMonth) && (
                          <div className="invalid-feedback d-block">
                            {errors.expYear?.message ||
                              errors.expMonth?.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className={labelBase} htmlFor="cvc">
                          安全碼 (CVC/CVV)
                        </label>
                        <input
                          id="cvc"
                          type="text"
                          inputMode="numeric"
                          className={`${inputBase} ${errors.cvc ? "is-invalid" : ""}`}
                          placeholder="簽名欄上的三位數安全碼"
                          {...register("cvc", {
                            required: "請輸入安全碼",
                            pattern: {
                              value: /^\d{3,4}$/,
                              message: "安全碼通常為 3–4 位數",
                            },
                          })}
                        />
                        {errors.cvc && (
                          <div className="invalid-feedback">
                            {errors.cvc.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className={labelBase} htmlFor="cardLastName">
                          姓氏
                        </label>
                        <input
                          id="cardLastName"
                          type="text"
                          className={`${inputBase} ${errors.cardLastName ? "is-invalid" : ""}`}
                          placeholder="請輸入持卡人的姓氏"
                          {...register("cardLastName", {
                            required: "請輸入姓氏",
                          })}
                        />
                        {errors.cardLastName && (
                          <div className="invalid-feedback">
                            {errors.cardLastName.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 ">
                        <label className={labelBase} htmlFor="cardFirstName">
                          名稱
                        </label>
                        <input
                          id="cardFirstName"
                          type="text"
                          className={`${inputBase} ${errors.cardFirstName ? "is-invalid" : ""}`}
                          placeholder="請輸入持卡人的名稱"
                          {...register("cardFirstName", {
                            required: "請輸入名稱",
                          })}
                        />
                        {errors.cardFirstName && (
                          <div className="invalid-feedback">
                            {errors.cardFirstName.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 其他付款方式：先放提示（你之後可補欄位） */}
                {paymentMethod !== PAYMENT.CREDIT && (
                  <div className="text-muted small">
                    已選擇：{paymentMethod}（此階段可先做 UI，之後再串 API
                    或補對應欄位）
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 分隔線：左右兩邊都往外擴展一點（-80px）讓它滿版一點 */}
        <div
  className="border-top text-neutral-200 mx-100"
  // style={{ 
  //   width: "100vw", 
  //   position: "relative",
  //   left: "50%",
  //   right: "50%",
  //   marginLeft: "-50vw",
  //   marginRight: "-50vw"
  // }}
  
/>

        {/* 底部按鈕區 */}
        <div className=" pt-4 text-center bg-light">
          <div className="row  ">
            {/* 左：返回上一步 */}
            {/* 手機：排序用 order，lg 以上回到左邊 */}
            <div className="col-12 col-lg d-flex justify-content-start align-items-end order-3 order-lg-1 mt-3 mt-lg-0">
              <button
                type="button"
                className="btn btn-outline-dark  px-4 py-3 fw-medium"
                onClick={() => navigate(-1)}
              >
                返回上一步
              </button>
            </div>

            {/* 右：checkbox + 下一步 */}
            <div className="col-12 col-lg d-flex flex-column align-items-start gap-3 order-1 order-lg-2">
              {/* 同意條款 checkbox */}
              <div className="form-check m-0 fs-8 fw-medium py-2">
                <input
                  className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
                  type="checkbox"
                  id="terms"
                  {...register("terms", { required: "請勾選同意條款" })}
                />

                <label
                  className="form-check-label text-dark px-2"
                  htmlFor="terms"
                >
                  我已閱讀並同意{" "}
                  <a
                    href="https://bootstrap5.hexschool.com/docs/5.0/utilities/flex/"
                    className="text-decoration-underline text-primary-600"
                  >
                    服務條款
                  </a>
                  、
                  <a
                    href="https://bootstrap5.hexschool.com/docs/5.0/utilities/flex/"
                    className="text-decoration-underline text-primary-600"
                  >
                    退換貨政策
                  </a>{" "}
                  及{" "}
                  <a
                    href="https://bootstrap5.hexschool.com/docs/5.0/utilities/flex/"
                    className="text-decoration-underline text-primary-600"
                  >
                    隱私權政策
                  </a>
                </label>
                {errors.terms && (
                  <div className="invalid-feedback d-block">
                    {errors.terms.message}
                  </div>
                )}
              </div>

              {/* 下一步按鈕 */}
              <button
                type="submit"
                className="btn flex-fill w-100 py-3 text-white fw-medium bg-dark"
                disabled={isSubmitting}
              >
                下一步
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
