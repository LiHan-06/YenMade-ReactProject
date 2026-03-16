import { Outlet } from "react-router";
import Header from "../views/Header";
import Footer from "../views/Footer";

function HomeLayout() {
  return (
    <>
      <Header variant="home" />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
