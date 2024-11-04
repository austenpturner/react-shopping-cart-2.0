import { useContext } from "react";
import styles from "./commonInput.module.scss";
import PropTypes from "prop-types";
import { UIContext } from "../../context/uiContext";
import useWindowResize from "../../hooks/useWindowResize";

export default function CommonInput({
  label,
  name,
  id,
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  const { state } = useContext(UIContext);
  const { width } = useWindowResize();

  return (
    <div className={styles.commonInputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={className}
        tabIndex={
          state.overlayVisible || (state.accountViewListOpen && width <= 768)
            ? "-1"
            : "0"
        }
      />
    </div>
  );
}

CommonInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
