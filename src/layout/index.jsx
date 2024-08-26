import { Outlet } from "react-router-dom";
import MainHeader from "../components/mainHeader";
import Overlay from "../components/overlay/overlay";

export default function Layout() {
  return (
    <>
      <Overlay />
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
