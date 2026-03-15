import { Outlet } from "react-router";
import ScrollToTop from "../components/ScrollToTop";
import Header from "../Header";
import Footer from "../Footer";

function DefaultLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
