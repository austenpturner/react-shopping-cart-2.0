import { Outlet } from "react-router-dom";
import MainHeader from "../components/header";

export default function Layout() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
