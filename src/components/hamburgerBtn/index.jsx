import { useContext } from "react";
import styles from "./hamburgerBtn.module.scss";
import { UIContext } from "../../context/uiContext";
import useToggleMobileMenu from "../../hooks/useToggleMobileMenu";

export default function HamburgerBtn() {
  const { state } = useContext(UIContext);
  const handleToggleMobileMenu = useToggleMobileMenu();

  return (
    <button
      aria-label={
        state.openMobileCategoryMenu
          ? "close category menu"
          : "open category menu"
      }
      aria-expanded={state.openMobileCategoryMenu}
      aria-controls="categoryMenu"
      className={styles.mobileNavBtn}
      onClick={() => handleToggleMobileMenu()}
      tabIndex={state.modal.isVisible || state.accountViewListOpen ? "-1" : "0"}
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
