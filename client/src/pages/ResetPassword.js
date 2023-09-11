import { FormRow, Alert, Loading, Logo } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';
import React, { useState, useEffect } from 'react';

import submitHelper from '../utils/submitHelper';
import { useAppContext } from "../context/appContext";
import { Link, useSearchParams } from "react-router-dom";
import blurHelper from "../utils/blurHelper";


const initialState = {
  password: ''
}

const ResetPassword = () => {
  const { isLoading, tokenLoading, tokenFound, showAlert, resetPassword, checkToken } = useAppContext()


  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  // console.log(params)

  const { token, id } = params;

  const [value, setValue] = useState(initialState);

  const [validUrl, setValidUrl] = useState(false);

  const initialErr = {
    password: false
  }

  const [showErr, setShowErr] = useState(initialErr)

  const err = showErr;

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setValue({ ...value, password: e.target.value })
    if (value !== '') {
      setShowErr({
        ...showErr,
        password: false
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitHelper(err, showErr, setShowErr)
    if (!submitted && !showErr.password) {
      resetPassword(id, token, value.password)
      setSubmitted(true);
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    blurHelper(name, value, err, showErr, setShowErr);
  }

  const asyncFetch = async (token, id) => {
    const validToken = await checkToken(token, id);
    setValidUrl(validToken);
  }

  useEffect(() => {
    asyncFetch(token, id)
  }, [tokenFound])

  return (
    <React.Fragment>
      {tokenLoading &&
        <div
          className="loading-container"
          style={
            { height: "calc(100vh - var(--nav-height))" }
          }
        >
          <Loading center />
        </div>
      }
      {!tokenLoading && <Wrapper className="full-page">
        {validUrl && <form className="form" onSubmit={handleSubmit}>
          <Logo />
          <h3>Add New Password</h3>
          {/* {id && <p>{id}</p>} */}
          {showAlert && !showErr.password && <Alert />}
          {!submitted && <FormRow
            type="password"
            name="password"
            value={value.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isError={showErr.password}
            feedback="Please provide a password (at least 6 characters)"
          />}
          {!submitted && <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
          >
            {!isLoading && "Submit"}
            {isLoading && "Please Wait..."}
          </button>}
          {submitted && <p>Your password has been changed!</p>}
          {submitted &&
            <Link to="/register">
              <button
                type="button"
                className="btn btn-block"
              >
                Go to login
              </button>
            </Link>
          }
        </form>}
        {!validUrl &&
          <div className="form">
            <h3>Oops!</h3>
            <p>This reset link seems to be incorrect or expired.</p>
            <Link to="/landing">
              <button
                type="button"
                className="btn btn-block"
              >
                Go to home
              </button>
            </Link>
          </div>}
      </Wrapper>}
    </React.Fragment>
  )
}

export default ResetPassword;