import { Outlet } from "react-router-dom";
import MainHeader from "../components/mainHeader";
import Overlay from "../components/overlay/overlay";
import Modal from "../components/modal/modal";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <>
      <Overlay />
      <MainHeader />
      <main>
        <Outlet />
        <Modal />
        <Footer />
      </main>
    </>
  );
}
