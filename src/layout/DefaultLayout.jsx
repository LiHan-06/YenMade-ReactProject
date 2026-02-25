import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "../Footer";

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
