import { createBrowserRouter } from "react-router";

import HomeLayout from "./layout/HomeLayout";
import DefaultLayout from "./layout/DefaultLayout";

import App from "./App";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AllProducts from "./AllProducts";
import AProduct from "./AProduct";
import About from "./About";
import Blog from "./Blog";
import FAQ from "./FAQ";

import CheckOut from "./CheckOut";
import CartStepOne from "./CartStepOne";
import OrderReview from "./OrderReview";
import OrderSuccess from "./OrderSuccess";
import CartOrderForm from "./CartOrderForm";

export const router = createBrowserRouter(
  [
    {
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <App />,
        },
      ],
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "AllProducts",
          element: <AllProducts />,
        },
        {
          path: "product/:id",
          element: <AProduct />,
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "Blog",
          element: <Blog />,
        },
        {
          path: "FAQ",
          element: <FAQ />,
        },
        {
          path: "CheckOut",
          element: <CheckOut />,
          children: [
            {
              index: true,
              element: <CartStepOne />,
            },
            {
              path: "CartOrderForm",
              element: <CartOrderForm />,
            },
            {
              path: "OrderReview",
              element: <OrderReview />,
            },
            {
              path: "OrderSuccess",
              element: <OrderSuccess />,
            },
          ],
        },
        {
          path: "SignIn",
          element: <SignIn />,
        },
        {
          path: "SignUp",
          element: <SignUp />,
        },
      ],
    },
  ],
  {
    basename: "/YenMade-ReactProject",
  },
);
