import React, { useState, useEffect, useMemo } from 'react'
import Wrapper from '../assets/wrappers/SetNameInput'
import { useAppContext } from '../context/appContext';
import { useLocation } from 'react-router-dom';

const SetNameInput = ({ set }) => {
  const {
    getSet,
    updateName,
    isLoading,
    set: stateSet
  } = useAppContext()

  const location = useLocation();
  const state = set || location.state;
  // console.log(state)
  const { name, _id: id } = state
  // ? state : {};

  const [formName, setFormName] = useState(name);
  // console.log(formName)
  const [validFormName, setValidFormName] = useState(name)
  // console.log(formName)

  // const location = useLocation().pathname;
  // const splitLoc = location.split('/');
  // const setId = splitLoc[splitLoc.length - 1]

  // const style = {
  //   width: isLoading || formName ? "auto" : formName.length
  // }

  const handleChange = (e) => {
    setFormName(e.target.value)
    // console.log(e.target.value)
  }

  const handleBlur = (e) => {
    setter()
    if (!(validFormName == formName)) {
      handleSubmit(e)
    }
  }

  const setter = () => {
    if (formName.trim() === '') {
      setFormName(validFormName);
    } else {
      setValidFormName(formName);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setter();
    if (!(validFormName == formName)) {
      const forSubmit = formName.trim() || validFormName;
      updateName(id, forSubmit);
    }
    return false;
  }



  useEffect(() => {
    if (name) {
      setFormName(name);
      setValidFormName(name);
    }
  }, [name])

  // console.log('randered')

  return (
    <React.Fragment>
      {isLoading && <h1
        id="name-placeholder"
        style={{ textTransform: "none" }}
      >
        {formName}
      </h1>}
      {!isLoading && <Wrapper>
        <form
          className="formName-form"
          // autocomplete="off"
          onSubmit={handleSubmit}
          disabled={isLoading}
        >
          {/* <h1>{formName}</h1> */}
          <input
            className="form-input"
            name="name"
            type="text"
            value={formName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </form>
      </Wrapper>}
    </React.Fragment>
  )
}

export default SetNameInput