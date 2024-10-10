import { useContext } from "react";
import { UIContext } from "../context/uiContext";
import useWindowResize from "./useWindowResize";

export default function useToggleMobileNav() {
  const { state, uiDispatch } = useContext(UIContext);
  const { width } = useWindowResize();

  function handleToggleMobileNav() {
    if (width < 1024) {
      uiDispatch({
        type: "TOGGLE_MOBILE_NAV",
        payload: !state.overlayVisible,
      });
      uiDispatch({ type: "TOGGLE_OVERLAY", payload: !state.overlayVisible });
    } else {
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    }
  }

  return handleToggleMobileNav;
}
