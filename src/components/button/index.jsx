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

  return (
    <button
      className={type}
      onClick={handleAction ? () => handleAction(item, action) : null}
      tabIndex={state.overlayVisible && type !== "logout" ? "-1" : "0"}
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
