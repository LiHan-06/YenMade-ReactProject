import { Outlet } from "react-router";
import Header from "../views/Header";
import Footer from "../views/Footer";

function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
