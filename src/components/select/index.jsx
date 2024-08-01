import PropTypes from "prop-types";

export default function CommonSelect({
  label,
  name,
  id,
  value,
  onChange,
  options,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={id} name={name} onChange={onChange} value={value}>
        <option>-- Please choose an option --</option>
        {options?.length
          ? options.map((optionItem, index) => {
              return (
                <option key={index} value={optionItem.value}>
                  {optionItem.name}
                </option>
              );
            })
          : null}
      </select>
    </>
  );
}

CommonSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};
