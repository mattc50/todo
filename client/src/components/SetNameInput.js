import React, { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/SetNameInput'
import { useAppContext } from '../context/appContext';
import { useLocation } from 'react-router-dom';

const SetNameInput = ({ set }) => {
  const {
    updateName,
    isLoading
  } = useAppContext()

  const location = useLocation();
  const state = set || location.state;
  const { name, _id: id } = state

  const [formName, setFormName] = useState(name);
  const [validFormName, setValidFormName] = useState(name)

  const handleChange = (e) => {
    setFormName(e.target.value)
  }

  const handleBlur = (e) => {
    setter()
    if (!(validFormName === formName)) {
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
    if (!(validFormName === formName)) {
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
          onSubmit={handleSubmit}
          disabled={isLoading}
        >
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