import { Outlet } from "react-router";
import ScrollToTop from "../components/ScrollToTop";
import Header from "../Header";
import Footer from "../Footer";

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
