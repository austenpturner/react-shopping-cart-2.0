import { Link, useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import Button from "../button/index.jsx";
import { useContext, useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize.js";
import { UIContext } from "../../context/uiContext.jsx";
import { mainNavItems } from "../../config/pages.js";
// import HamburgerBtn from "../hamburgerBtn/hamburgerBtn.jsx";
// import useToggleMobileNav from "../../hooks/useToggleMobileNav.js";

export default function MainNav() {
  const loading = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const { state, uiDispatch } = useContext(UIContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(state.openMobileNav);
  const { width } = useWindowResize();
  // const handleToggleMobileNav = useToggleMobileNav();

  function handleNavigate(page) {
    if (page.name === "account") {
      sessionStorage.setItem("currentViewType", "overview");
    }
    // handleToggleMobileNav(width);
  }

  function handleShowLogoutConfirmation() {
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: null,
        type: "logoutConfirmation",
      },
    });
  }

  function handleClickLogInOutBtn() {
    if (user) {
      handleShowLogoutConfirmation();
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    } else {
      // handleToggleMobileNav(width);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (width >= 1024) {
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
      if (!state.modal.isVisible) {
        uiDispatch({ type: "TOGGLE_OVERLAY", payload: false });
      }
    }
  }, [width]);

  useEffect(() => {
    setMobileNavOpen(state.openMobileNav);
  }, [state.openMobileNav]);

  return (
    <div className={styles.mainNavContainer}>
      {/* <HamburgerBtn handleAction={handleToggleMobileNav} /> */}
      <nav>
        <ul
          className={styles.mainNav}
          id="mainNav"
          // data-visible={mobileNavOpen ? true : false}
        >
          {mainNavItems.map((item) => {
            return (
              <Link
                key={item.id}
                onClick={() => handleNavigate(item)}
                to={item.link}
                tabIndex={mobileNavOpen || width >= 1024 ? "0" : "-1"}
              >
                {<item.icon />}
              </Link>
            );
          })}
          <li>
            {loading ? (
              <button></button>
            ) : (
              <Button
                handleAction={handleClickLogInOutBtn}
                text={user ? "Logout" : "Log in"}
                type={user ? "logout" : "login"}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
