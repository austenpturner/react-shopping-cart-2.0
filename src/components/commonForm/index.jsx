import CommonInput from "../commonInput";
import PropTypes from "prop-types";
import Select from "../select";
import TextArea from "../text-area";
import styles from "./commonForm.module.css";

const formElementTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXT_AREA: "text-area",
};
export default function CommonForm({
  formControls = [],
  btnText,
  formData,
  setFormData,
  onSubmit,
}) {
  function renderFormElement(getCurrentFormControl, getFormData) {
    let element = null;

    switch (getCurrentFormControl.componentType) {
      case formElementTypes.INPUT:
        element = (
          <CommonInput
            label={getCurrentFormControl.label}
            type={getCurrentFormControl.type}
            placeholder={getCurrentFormControl.placeholder}
            value={getFormData[getCurrentFormControl.name]}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getCurrentFormControl.name]: event.target.value,
              })
            }
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
            onChange={(event) =>
              setFormData({
                ...formData,
                [getCurrentFormControl.name]: event.target.value,
              })
            }
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
            onChange={(event) =>
              setFormData({
                ...formData,
                [getCurrentFormControl.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <CommonInput
            label={getCurrentFormControl.label}
            type={getCurrentFormControl.type}
            placeholder={getCurrentFormControl.placeholder}
            value={getFormData[getCurrentFormControl.name]}
            name={getCurrentFormControl.name}
            id={getCurrentFormControl.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getCurrentFormControl.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit} className={styles.commonForm}>
      {formControls.map((formControl) => {
        return (
          <div key={formControl.id}>
            {renderFormElement(formControl, formData)}
          </div>
        );
      })}
      <button type="submit">{btnText || "submit"}</button>
    </form>
  );
}

CommonForm.propTypes = {
  formControls: PropTypes.array,
  btnText: PropTypes.string,
  formData: PropTypes.object,
  onSubmit: PropTypes.func,
  setFormData: PropTypes.func,
};