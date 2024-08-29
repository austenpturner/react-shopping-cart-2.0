import PropTypes from "prop-types";
import "./styles.scss";

export default function Button({
  type,
  action,
  handleAction,
  item,
  text,
  icon,
}) {
  return (
    <button
      className={type}
      onClick={handleAction ? () => handleAction(item, action) : null}
    >
      {text ? text : icon}
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
