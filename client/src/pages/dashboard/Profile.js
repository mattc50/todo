import { useState, useEffect } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

import blurHelper from '../../utils/blurHelper';
import submitHelper from '../../utils/submitHelper';
import { convertToBase64, compressImage } from '../../utils/convertToBase64';
import { FaUserCircle } from 'react-icons/fa';

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
  const [profPic, setProfPic] = useState(user?.profPic);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // const base64 = await convertToBase64(file)
    const base64 = await compressImage(file, 0.2, 0.2)
    console.log(base64)
    setProfPic(base64);
    var stringLength = base64.length - 'data:image/png;base64,'.length;

    var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;
    console.log(sizeInKb);
    console.log('uploaded')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // when testing, remove temporarily
    // if (!name || !email || !lastName) {
    //   displayAlert();
    //   return;
    // }
    const compProfPic = await compressImage(0.2, 0.2);

    submitHelper(errs, showErrs, setShowErrs)

    // updateUser({ name, email, lastName, compProfPic });
    return false;
  };

  useEffect(() => {

  }, [profPic])

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {profPic ? <img id="prof-pic" className="user-pic" src={profPic || user.profPic} /> : <FaUserCircle className="user-pic" />}
        {showAlert && (!showErrs.name && !showErrs.email && !showErrs.lastName) && <Alert />}
        <label htmlFor="image" className="btn">Choose Profile Picture</label>
        <input
          type="file"
          id="image"
          name="image"

          // accept="image/*"
          accept=".jpg, .png, .jpeg, .gif"
          onChange={(e) => handleFileUpload(e)}
        />
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