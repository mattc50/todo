import { useAppContext } from "../context/appContext";

const FormRow = ({
  type, name, value, handleChange, labelText
}) => {

  // ADDITION:    the errors value in the global context is used to 
  //              determine which fields, if any, require feedback text 
  //              below them. Then, the feedback text is shown only if the 
  //              field has an error, as determined by the && operator for 
  //              the <p> tag.
  const { errors } = useAppContext()
  let hasError = errors.hasOwnProperty(name)
  if (value !== '') {
    if (name === 'name' && value.length > 2) hasError = false;
    if (name === 'password' && value.length > 5) hasError = false;
    if (name === 'email') hasError = false;
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
      {hasError && <small className="feedback">
        {errors[name]}
      </small>}
    </div>
  )
}

export default FormRow;