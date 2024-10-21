import PropTypes from "prop-types";
import "./styles.scss";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import useWindowResize from "../../hooks/useWindowResize";

export default function Button({
  type,
  action,
  handleAction,
  item,
  text,
  icon,
}) {
  const { state } = useContext(UIContext);
  const { width } = useWindowResize();

  function getTabIndex() {
    if (
      state.overlayVisible &&
      (type === "confirmation" || type === "closeModal")
    ) {
      return "0";
    }
    if (!state.openMobileCategoryMenu && type === "filter" && width <= 1024) {
      return "-1";
    }
    if (state.openMobileCategoryMenu && type !== "filter") {
      return "-1";
    }
    if (state.accountViewListOpen && type !== "logout") {
      return "-1";
    }
    if (
      state.modal.isVisible &&
      ["social", "mainNav", "submit", "logout", "filter"].includes(type)
    ) {
      return "-1";
    }
    return "0";
  }

  return (
    <button
      className={type}
      onClick={handleAction ? () => handleAction(item, action) : null}
      tabIndex={getTabIndex()}
    >
      {text && text}
      {icon && icon}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.string,
  handleAction: PropTypes.func,
  item: PropTypes.object,
  icon: PropTypes.element,
};
