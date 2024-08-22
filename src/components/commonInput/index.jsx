import styles from "./commonInput.module.scss";
import PropTypes from "prop-types";

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
  return (
    <div className={styles.commonInputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={id}
        type={type || "text"}
        placeholder={placeholder || "Enter value here... "}
        value={value}
        onChange={onChange}
        className={className || styles.commonForm}
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
