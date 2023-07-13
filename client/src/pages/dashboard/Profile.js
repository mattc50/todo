import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

import blurHelper from '../../utils/blurHelper';
import submitHelper from '../../utils/submitHelper';

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading
  } = useAppContext();

  const initialErrs = ({
    name: false,
    email: false,
    lastName: false
  })

  const [showErrs, setShowErrs] = useState(initialErrs)

  const errs = showErrs;

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    blurHelper(name, value, errs, showErrs, setShowErrs);
    // if (e.target.value === '') {
    //   setShowErrs({
    //     ...showErrs,
    //     [name]: true
    //   })
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // when testing, remove temporarily
    // if (!name || !email || !lastName) {
    //   displayAlert();
    //   return;
    // }
    submitHelper(errs, showErrs, setShowErrs)

    updateUser({ name, email, lastName });
  };
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && (!showErrs.name && !showErrs.email && !showErrs.lastName) && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleBlur={handleBlur}
            handleChange={(e) => {
              setName(e.target.value)
              // setShowErrs({
              //   ...showErrs,
              //   [e.target.name]: false
              // })
            }}
            isError={showErrs.name}
            feedback="Please provide a name (at least 3 characters)"
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleBlur={handleBlur}
            handleChange={(e) => {
              setLastName(e.target.value)
              // setShowErrs({
              //   ...showErrs,
              //   [e.target.name]: false
              // })
            }}
            isError={showErrs.lastName}
            feedback="Please provide a last name (at most 20 characters)"
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleBlur={handleBlur}
            handleChange={(e) => {
              setEmail(e.target.value)
              // setShowErrs({
              //   ...showErrs,
              //   [e.target.name]: false
              // })
            }}
            isError={showErrs.email}
            feedback="Please provide an email"
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;