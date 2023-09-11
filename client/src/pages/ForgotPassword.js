import { FormRow, Alert, Logo } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';
import { useState } from 'react';

import submitHelper from '../utils/submitHelper';
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import blurHelper from "../utils/blurHelper";

const ForgotPassword = () => {
  const { isLoading, showAlert, requestPasswordReset } = useAppContext()

  const initialState = {
    email: ''
  }

  const [value, setValue] = useState(initialState);

  const [emailSent, setEmailSent] = useState(false)

  const initialErr = {
    email: false
  }

  const [showErr, setShowErr] = useState(initialErr)

  const err = showErr;

  const handleChange = (e) => {
    setValue({ ...value, email: e.target.value })
    if (value !== '') {
      setShowErr({
        ...showErr,
        email: false
      })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    blurHelper(name, value, err, showErr, setShowErr)
    if (value !== '') {
      setShowErr({
        ...showErr,
        email: false
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitHelper(err, showErr, setShowErr)
    if (!showErr.email) {
      requestPasswordReset(value.email)
      setEmailSent(true)
    }
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Forgot Password?</h3>
        {!emailSent && <p>No worries!</p>}
        {!emailSent && <p>Please type in your email to have a reset link sent to you! </p>}
        {showAlert && !showErr.email && <Alert />}
        {!emailSent && <FormRow
          type="email"
          name="email"
          value={value.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isError={showErr.email}
          feedback="Please provide an email"
        />}
        {!emailSent && <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
        >
          {!isLoading && "Submit"}
          {isLoading && "Please Wait..."}
        </button>}
        {emailSent && <p>An email has been sent to <b>{value.email}</b></p>}
        {
          <Link to="/register">
            <button
              type="button"
              className={`btn btn-block ${emailSent ? '' : 'btn-secondary'}`}
            >
              {emailSent ? "Go to login" : "Back to login"}
            </button>
          </Link>
        }
      </form>
    </Wrapper>
  )
}

export default ForgotPassword;