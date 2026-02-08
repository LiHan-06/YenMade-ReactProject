import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";

import CartStepOne from "./CartStepOne.jsx";

// images
import line from "./assets/images/checkOut/Line 1.png";
import GreenOnm from "./assets/images/checkOut/Feature-number (1).png";
import outLineTwo from "./assets/images/checkOut/Feature-number (2).png";
import outLineThree from "./assets/images/checkOut/Feature-number (3).png";
import outLineFour from "./assets/images/checkOut/Feature-number (4).png";

function CheckOut() {
  return (
    <main className="container pt-8">
      <section>
        <h1 className="text-center">購物車</h1>
        <ul className="row justify-content-center align-items-center gx-1 gx-lg-4 mx-0 px-0 mx-lg-8 px-lg-8 my-6 my-lg-5 py-lg-5 list-unstyled">
          <li className="col text-center">
            <img src={GreenOnm} alt="oneStep" />
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
      </section>
      <CartStepOne />
    </main>
  );
}

export default CheckOut;
