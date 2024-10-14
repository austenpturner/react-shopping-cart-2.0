import { useContext } from "react";
import { UIContext } from "../context/uiContext";
import useWindowResize from "./useWindowResize";

export default function useToggleMobileMenu() {
  const { state, uiDispatch } = useContext(UIContext);
  const { width } = useWindowResize();

  function handleToggleMobileMenu() {
    if (width < 1024) {
      uiDispatch({
        type: "TOGGLE_MOBILE_CATEGORY_MENU",
        payload: !state.openMobileCategoryMenu,
      });
      uiDispatch({ type: "TOGGLE_OVERLAY", payload: !state.overlayVisible });
    } else {
      uiDispatch({ type: "TOGGLE_MOBILE_CATEGORY_MENU", payload: false });
    }
  }

  return handleToggleMobileMenu;
}
