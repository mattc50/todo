import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Logo, Alert, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser
  } = useAppContext()

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password }
    if (isMember) {
      console.log('Already a member')
    } else {
      registerUser(currentUser)
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }
  }, [user, navigate])

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

        {showAlert && <Alert />}

        {/*name field; shown only is user is logging in*/}
        {!values.isMember && (<FormRow
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

        {/*password field*/}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
        >
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