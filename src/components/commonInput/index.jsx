import { useContext } from "react";
import styles from "./commonInput.module.scss";
import PropTypes from "prop-types";
import { UIContext } from "../../context/uiContext";

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
        tabIndex={state.overlayVisible ? "-1" : "0"}
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
