import Input from "../input";
import PropTypes from "prop-types";
import Select from "../select";
import TextArea from "../text-area";

const formElementTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXT_AREA: "text-area",
};
export default function Form({
  formControls = [],
  btnText,
  formData,
  onSubmit,
}) {
  function renderFormElement(getCurrentFormControl, getFormData) {
    let element = null;

    switch (getCurrentFormControl.componentType) {
      case formElementTypes.INPUT:
        element = (
          <Input
            type={getCurrentFormControl.type}
            placeholder={getCurrentFormControl.placeholder}
            value={getFormData[getCurrentFormControl.name]}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            onChange={getCurrentFormControl.onChange}
          />
        );
        break;
      case formElementTypes.SELECT:
        element = (
          <Select
            label={getCurrentFormControl.label}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            placeholder={getCurrentFormControl.placeholder}
            value={formData[getCurrentFormControl.name]}
            options={getCurrentFormControl.options}
            onChange={getCurrentFormControl.onChange}
          />
        );
        break;
      case formElementTypes.TEXT_AREA:
        element = (
          <TextArea
            label={getCurrentFormControl.label}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            placeholder={getCurrentFormControl.placeholder}
            value={formData[getCurrentFormControl.name]}
            onChange={getCurrentFormControl.onChange}
          />
        );
        break;

      default:
        element = (
          <Input
            type={getCurrentFormControl.type}
            placeholder={getCurrentFormControl.placeholder}
            value={getFormData[getCurrentFormControl.name]}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            onChange={getCurrentFormControl.onChange}
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      {formControls.map((formControl) =>
        renderFormElement(formControl, formData)
      )}
      <button type="submit">{btnText || "submit"}</button>
    </form>
  );
}

Form.propTypes = {
  formControls: PropTypes.array,
  btnText: PropTypes.string,
  formData: PropTypes.object,
  onSubmit: PropTypes.func,
};
