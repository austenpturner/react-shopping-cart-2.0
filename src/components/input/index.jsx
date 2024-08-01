import styles from "input.module.css";
import PropTypes from "prop-types";

export default function Input({
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
    <>
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
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
