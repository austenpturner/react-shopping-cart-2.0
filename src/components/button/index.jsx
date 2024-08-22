import PropTypes from "prop-types";

export default function Button({ type, action, handleAction, item, text }) {
  return (
    <button className={type} onClick={() => handleAction(item, action)}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.string,
  handleAction: PropTypes.func,
  item: PropTypes.object,
};
