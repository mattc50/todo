const blurHelper = (name, value, errs, showErrs, setShowErrs) => {
  if (name === 'name') {
    if (value.length < 3) {
      errs[name] = 'Please provide a name (at least 3 characters)'
      setShowErrs({ ...showErrs, [name]: true })
    } else {
      setShowErrs({ ...showErrs, [name]: false })
    }
  }

  if (name === 'email') {
    if (value === '') {
      errs[name] = 'Please provide an email'
      setShowErrs({ ...showErrs, [name]: true })
    } else {
      setShowErrs({ ...showErrs, [name]: false })
    }
  }

  if (name === 'password') {
    if (value.length < 6) {
      errs[name] = 'Please provide a password (at least 6 characters)'
      setShowErrs({ ...showErrs, [name]: true })
    } else {
      setShowErrs({ ...showErrs, [name]: false })
    }
  }

  if (name === 'lastName') {
    if (value === '' || value.length > 20) {
      errs[name] = 'Please provide a last name (at most 20 characters)'
      setShowErrs({ ...showErrs, [name]: true })
    } else {
      setShowErrs({ ...showErrs, [name]: false })
    }
  }
}

export default blurHelper;