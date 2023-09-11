import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { Logo, Alert, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

import blurHelper from '../utils/blurHelper';
import submitHelper from '../utils/submitHelper';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const {
    user,
    isLoading,
    showAlert,
    registerUser,
    loginUser,
    clearAlertInstant
  } = useAppContext()

  const initialErrs = ({
    name: false,
    email: false,
    password: false
  })

  const [showErrs, setShowErrs] = useState(initialErrs)

  const errs = showErrs;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password' && values.isMember) {
      setShowErrs({
        ...showErrs,
        password: false
      })
    } else {
      setShowErrs({
        ...showErrs,
        [e.target.name]: false
      })
    }
    clearAlertInstant();
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    blurHelper(name, value, errs, showErrs, setShowErrs);
    if (name === 'password' && value !== '' && values.isMember) {
      setShowErrs({
        ...showErrs,
        password: false
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    // COMMENT OUT THE CONDITON BELOW TO THROW BACKEND-HANDLED ERRORS

    // if (!email || !password || (!isMember && !name)) {
    //   displayAlert();
    //   return;
    // }

    submitHelper(errs, showErrs, setShowErrs)

    if (values.password !== '' && values.isMember) {
      setShowErrs({
        ...showErrs,
        password: false
      })
    }

    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember
    });
    setShowErrs({
      name: false,
      email: false,
      password: false
    })
    clearAlertInstant();
  }

  useEffect(() => {
    setShowErrs({
      name: showErrs.name,
      email: showErrs.email,
      password: showErrs.password
    })
    // eslint-disable-next-line
  }, [setShowErrs])

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          {/*control h3 depending on whether user is logging in or registering*/}
          <h3>{values.isMember ? "Login" : "Register"}</h3>

          {showAlert && (!showErrs.name && !showErrs.email && !showErrs.password) && <Alert />}

          {/*name field; shown only is user is logging in*/}
          {!values.isMember && (<FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isError={showErrs.name}
            feedback="Please provide a name (at least 3 characters)"
          />)}

          {/*email field*/}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isError={showErrs.email}
            feedback="Please provide an email"
          />

          {/*password field*/}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isError={showErrs.password}
            feedback="Please provide a password (at least 6 characters)"
          />

          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
          >
            {values.isMember && !isLoading && "Log In"}
            {!values.isMember && !isLoading && "Register"}
            {isLoading && "Please Wait..."}
          </button>

          {/*button to toggle login/register action*/}
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button
              type="button"
              onClick={toggleMember}
              className="member-btn"
            >
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
          <Link to='/forgot-password'>
            <p>Forgot Password?</p>
          </Link>
        </form>
      </Wrapper>
    </React.Fragment>
  )
}

export default Register