import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Header from "../views/Header";
import Footer from "../views/Footer";

function HomeLayout() {
  return (
    <>
      <ScrollToTop />
      <Header variant="home" />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
