const FormRow = ({
  type,
  name,
  value,
  handleChange,
  handleBlur,
  labelText,
  isError,
  feedback
}) => {
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
        onBlur={handleBlur}
        className={isError ? "form-input error" : "form-input"}
      />
      {isError && <small className="feedback">
        {feedback}
      </small>}
    </div>
  )
}

export default FormRow;