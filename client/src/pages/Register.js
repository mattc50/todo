import { useState, useEffect } from 'react';
import { Logo, Alert, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
};

function Register() {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const toggleMember = () => {
    setValues({
      ...values, isMember: !values.isMember
    });
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {/*control h3 depending on whether user is logging in or registering*/}
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {values.showAlert && <Alert />}

        {/*name field; shown only is user is logging in*/}
        {values.isMember && (<FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />)}

        {/*email field*/}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>

        {/*button to toggle login/register action*/}
        <p>
          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register