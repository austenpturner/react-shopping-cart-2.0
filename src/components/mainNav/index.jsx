import { Link, useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import Button from "../button/index.jsx";
import { useContext, useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize.js";
import { UIContext } from "../../context/uiContext.jsx";

export default function MainNav() {
  const loading = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const { state, uiDispatch } = useContext(UIContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(state.openMobileNav);
  const { width } = useWindowResize();

  const pages = [
    {
      name: "products",
      link: "/",
    },
    {
      name: "cart",
      link: "/cart",
    },
    {
      name: "account",
      link: "/account",
    },
  ];

  function handleNavigate(page) {
    if (page.name === "account") {
      sessionStorage.setItem("currentViewType", "overview");
    }
    handleToggleMobileNav();
  }

  function handleToggleMobileNav() {
    if (width < 1024) {
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: !state.overlayVisible });
      uiDispatch({ type: "TOGGLE_OVERLAY", payload: !state.overlayVisible });
    } else {
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    }
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

  function handleClick() {
    if (user) {
      handleShowLogoutConfirmation();
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    } else {
      handleToggleMobileNav();
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
      <button
        aria-label={
          mobileNavOpen ? "close navigation menu" : "open navigation menu"
        }
        aria-expanded={mobileNavOpen}
        aria-controls="mainNav"
        className={styles.mobileNavBtn}
        onClick={handleToggleMobileNav}
        tabIndex={state.modal.isVisible ? "-1" : "0"}
      >
        <svg
          className={styles.hamburger}
          viewBox="0 0 100 100"
          width="35"
          aria-hidden="true"
        >
          <rect
            className={`${styles.line} ${styles.line__top}`}
            width="90"
            height="10"
            x="5"
            y="25"
            rx="5"
          ></rect>
          <rect
            className={`${styles.line} ${styles.line__middle}`}
            width="90"
            height="10"
            x="5"
            y="45"
            rx="5"
          ></rect>
          <rect
            className={`${styles.line} ${styles.line__bottom}`}
            width="90"
            height="10"
            x="5"
            y="65"
            rx="5"
          ></rect>
        </svg>
      </button>
      <nav>
        <ul
          className={styles.mainNav}
          id="mainNav"
          data-visible={mobileNavOpen ? true : false}
        >
          {pages.map((page, index) => {
            return (
              <Link
                key={index}
                onClick={() => handleNavigate(page)}
                to={page.link}
                tabIndex={mobileNavOpen || width >= 1024 ? "0" : "-1"}
              >
                {page.name}
              </Link>
            );
          })}
          <li>
            {loading ? (
              <button></button>
            ) : (
              <Button
                handleAction={handleClick}
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
