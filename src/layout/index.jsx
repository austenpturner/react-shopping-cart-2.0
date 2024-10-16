import { Outlet } from "react-router-dom";
import MainHeader from "../components/mainHeader";
import Overlay from "../components/overlay";
import Modal from "../components/modal";
import Footer from "../components/footer";
import ScrollToTopBtn from "../components/scrollBtn";

export default function Layout() {
  return (
    <>
      <Overlay />
      <MainHeader />
      <main>
        <Outlet />
        <Modal />
        <Footer />
        <ScrollToTopBtn />
      </main>
    </>
  );
}
