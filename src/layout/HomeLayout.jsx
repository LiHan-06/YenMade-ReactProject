import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "../Footer";

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
