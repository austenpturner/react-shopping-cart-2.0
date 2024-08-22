import PropTypes from "prop-types";
import "./styles.scss";

export default function Button({ type, action, handleAction, item, text }) {
  console.log(type);

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
