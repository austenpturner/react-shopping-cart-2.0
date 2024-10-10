import { useContext } from "react";
import styles from "./hamburgerBtn.module.scss";
import { UIContext } from "../../context/uiContext";
import useToggleMobileNav from "../../hooks/useToggleMobileNav";

export default function HamburgerBtn() {
  const { state } = useContext(UIContext);
  const handleToggleMobileNav = useToggleMobileNav();

  return (
    <button
      aria-label={
        state.openMobileNav ? "close navigation menu" : "open navigation menu"
      }
      aria-expanded={state.openMobileNav}
      aria-controls="categoryMenu"
      className={styles.mobileNavBtn}
      onClick={() => handleToggleMobileNav()}
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
  );
}
