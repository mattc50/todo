import { useState, useEffect, useRef } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

import blurHelper from '../../utils/blurHelper';
import submitHelper from '../../utils/submitHelper';
import { compressToSizes } from '../../utils/convertToBase64';
import { FaUserCircle } from 'react-icons/fa';
import defaultUser from '../../assets/images/defaultUser.svg'

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

  // const [initialVals, setInitialVals] = useState({
  //   name: user?.name,
  //   email: user?.email,
  //   lastName: user?.lastName,
  // })

  const initialVals = {
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
  }

  // console.log(initialVals)

  const initialPic = user?.profPic;

  const [showErrs, setShowErrs] = useState(initialErrs)

  const errs = showErrs;

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [profPic, setProfPic] = useState(user?.profPic);

  const [noChanges, setNoChanges] = useState(true)

  const hiddenFileInput = useRef(null)

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  }

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
    // console.log(file.size)
    // console.log(file)
    // const newSrc = await convertToBase64(file)
    // console.log(newSrc)
    // setProfPic(newSrc);
    const imgToCompress = document.querySelector("#prof-pic");
    // imgToCompress.src = newSrc;
    // const base64 = await convertToBase64(file)
    if (file) {
      const fileType = file['type'];
      const validImageTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        // invalid file type code goes here.
        const newProfPic = await compressToSizes(imgToCompress, file)

        // console.log(newProfPic.compMed === user.profPic.compMed)
        // if (newProfPic.compMed !== user.profPic.compMed) {
        setProfPic(newProfPic)
        checkInitialVals(e.target.name, newProfPic)
        // }

        // console.log(newProfPic)
      }
    }
    // console.log(base64 === imgToCompress.src)
    // var stringLength = base64.length - 'data:image/png;base64,'.length;

    // var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    // var sizeInKb = sizeInBytes / 1000;
    // console.log(sizeInKb);
    // console.log('uploaded')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // when testing, remove temporarily
    // if (!name || !email || !lastName) {
    //   displayAlert();
    //   return;
    // }
    // const compProfPic = await compressImage(0.2, 0.2);

    submitHelper(errs, showErrs, setShowErrs)

    updateUser({ name, email, lastName, profPic });

    // setInitialVals({
    //   name: name,
    //   email: email,
    //   lastName: lastName,
    //   profPic: profPic
    // })

    setNoChanges(true)
  };

  // this function checks the initial values to see if the state values reflect any
  // changes.
  const checkInitialVals = (targName, targVal) => {

    // for each state property, the value assigned to it is either the one currently 
    // stored by its state variable, or the value of the event target, which will be
    // the most up-to-date modified value.
    const stateVals = {
      name: targName === 'name' ? targVal : name,
      email: targName === 'email' ? targVal : email,
      lastName: targName === 'lastName' ? targVal : lastName,
    }

    const statePic = targName === 'image' ? targVal : profPic;

    // for each item in the initial values Object, its value is compared to that of
    // the state values Object, which reflects the most recent value.
    // If there is a change, then setNoChanges becomes false, and the function is
    // exited with the return statement.
    for (const item in initialVals) {
      if (stateVals[item] !== initialVals[item]) {
        setNoChanges(false)
        return;
      }
    }

    // the same process is carried out for the profile picture Object. If a profile 
    // picture Object exists in both the initial value and local state, then its 
    // string values are compared, and any of its strings have been modified, 
    // setNoChanges becomes false.
    if (statePic && initialPic) {
      for (const str in initialPic) {
        if (statePic[str] !== initialPic[str]) {
          setNoChanges(false)
          return;
        }
      }

      // this condition will be run if either an initial profile picture Object or a 
      // local state profile picture Object do not exist, which would be the case when 
      // either of them are null (a profile picture has either never been uploaded, or 
      // has been removed as part of the profile modification).
      // setNoChanges will be set to false if either the profile picture is removed, 
      // or if the user uploads one after not having one.
    } else {
      if (statePic !== initialPic) {
        setNoChanges(false)
        return;
      }
    }
    setNoChanges(true)
  }

  useEffect(() => {
  }, [profPic])

  return (
    <Wrapper>
      <h3>profile </h3>
      <form className='form' onSubmit={handleSubmit}>
        {showAlert && (!showErrs.name && !showErrs.email && !showErrs.lastName) && <Alert />}
        <div className="img-container">
          <img id="prof-pic" className="user-pic" src={profPic?.compMed || defaultUser} />
          <div className="prof-pic-btns">
            <div className="file-upload-btn">
              <button
                htmlFor="image"
                className="btn btn-secondary"
                type="button"
                onClick={handleClick}
              >
                Choose Profile Picture
              </button>
              {/* <label tabIndex="0" htmlFor="image" className="btn btn-secondary">Choose Profile Picture</label> */}
              <input
                aria-label="image"
                type="file"
                id="image"
                name="image"
                ref={hiddenFileInput}
                hidden
                accept=".jpg, .png, .jpeg, .gif"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                // the following 2 lines function to remove the selected file from
                // the file input. Following that, the local state is updated to
                // reflect the fact that there is no file currently selected.
                // While this is not derived directly from the current file
                // selection, both the selection and state will update accordingly
                // when the file selection is removed.
                const fileInput = document.querySelector('#image')
                fileInput.value = ""

                setProfPic(null)
                checkInitialVals("image", null)
              }}
            >
              Remove Profile Picture
            </button>
          </div>
        </div>
        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleBlur={handleBlur}
            handleChange={(e) => {
              setName(e.target.value)
              checkInitialVals(e.target.name, e.target.value);
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
              checkInitialVals(e.target.name, e.target.value);
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
              checkInitialVals(e.target.name, e.target.value);
              // setShowErrs({
              //   ...showErrs,
              //   [e.target.name]: false
              // })
            }}
            isError={showErrs.email}
            feedback="Please provide an email"
          />
          <button
            className='btn btn-block'
            type='submit'
            disabled={noChanges || isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;