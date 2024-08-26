import { Link, useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout.js";
import Button from "../button/index.jsx";
import { useContext, useEffect, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize.js";
import { UIContext } from "../../context/uiContext.jsx";

export default function MainNav() {
  const loading = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const { state, uiDispatch } = useContext(UIContext);
  const handleLogout = useLogout();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { width } = useWindowResize();

  function handleToggleMobileNav() {
    setMobileNavOpen(!mobileNavOpen);
    uiDispatch({ type: "TOGGLE_OVERLAY", payload: !state.overlayVisible });
  }

  function handleClick() {
    if (user && confirm("Are you sure you want to log out?")) {
      handleLogout();
      handleToggleMobileNav();
    } else {
      handleToggleMobileNav();
      navigate("/login");
    }
  }

  useEffect(() => {
    if (width >= 1024) {
      setMobileNavOpen(false);
      uiDispatch({ type: "TOGGLE_OVERLAY", payload: false });
    }
  }, [width]);

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
          <li>
            <Link to={"/"} onClick={handleToggleMobileNav}>
              Products
            </Link>
          </li>
          <li>
            <Link to={"cart"} onClick={handleToggleMobileNav}>
              Cart
            </Link>
          </li>
          <li>
            <Link to={"account"} onClick={handleToggleMobileNav}>
              Account
            </Link>
          </li>
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
