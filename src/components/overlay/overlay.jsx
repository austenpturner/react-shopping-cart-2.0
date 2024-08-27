import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import styles from "./overlay.module.scss";

export default function Overlay() {
  const { state, uiDispatch } = useContext(UIContext);

  function handleCloseComponents() {
    if (state.modal.isVisible) {
      uiDispatch({ type: "HIDE_MODAL" });
      uiDispatch({ type: "TOGGLE_OVERLAY", payload: false });
    }
    // else {
    //   uiDispatch({ type: "TOGGLE_OVERLAY", payload: !state.overlayVisible });
    // }
  }

  return (
    <div
      className={styles.overlay}
      data-visible={state.overlayVisible ? true : false}
      aria-hidden="true"
      style={state.modal.isVisible ? { zIndex: 4000 } : { zIndex: 1000 }}
      onClick={handleCloseComponents}
    ></div>
  );
}
