import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

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

  // ADDITION:    the errors value in the global context is used to 
  //              determine which fields, if any, require feedback text 
  //              below them. Then, the feedback text is shown only if the 
  //              field has an error, as determined by the && operator for 
  //              the <p> tag.
  //              If disabled, please see if error-handler.js ⚑ code has 
  //              been commented out.

  // ADDITION:    This useEffect is used to re-render the component with 
  //              initialError, since the error state variable will initialize as 
  //              false regardless of the value of initialError. 
  //              Therefore, the useEffect provides the re-render and therefore 
  //              updates the state with the right value.
  //              Useful link: https://stackoverflow.com/a/60510422

  // useEffect(() => {
  //   //   // console.log(frontEndErrHandler.errShow)

  //   //   // setFrontEndErrHandler({
  //   //   //   ...frontEndErrHandler,
  //   //   //   errShow: true
  //   //   // })
  //   // setError(initialError)
  // }, [
  //   setError
  //   //   //setFrontEndErrHandler
  // ])

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