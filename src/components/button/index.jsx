import PropTypes from "prop-types";
import "./styles.scss";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function Button({
  type,
  action,
  handleAction,
  item,
  text,
  icon,
}) {
  const { state } = useContext(UIContext);

  function getTabIndex() {
    if (state.overlayVisible && type === "confirmation") {
      return "0";
    } else if (state.overlayVisible && type === "closeModal") {
      return "0";
    } else if (type === "logout" && !state.openMobileNav) {
      return "-1";
    } else if (state.openMobileNav && type !== "logout") {
      return "-1";
    } else {
      return "0";
    }
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
