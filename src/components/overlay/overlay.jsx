import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import styles from "./overlay.module.scss";

export default function Overlay() {
  const { state } = useContext(UIContext);

  return (
    <div
      className={
        state.overlayVisible
          ? `${styles.overlay} ${styles.visible}`
          : `${styles.mobileNavBtn}`
      }
      data-visible={state.overlayVisible ? true : false}
      aria-hidden="true"
    ></div>
  );
}
