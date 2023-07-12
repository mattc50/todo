import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',

    // ADDITION:  list stores a list of errors, which is sent in the data 
    //            of the response and is then stored in global context.
    list: {}
  }

  const errList = {};

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // ⚑
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')

    // ADDITION:  for each key (error) in the errors that are raised, 
    //            their field (name) and value (message) is added to an 
    //            Object (errList) which becomes the list of errors sent 
    //            with the response.
    const errObject = err.errors;
    for (const key in errObject) {
      const propObject = errObject[key];
      const propVal = propObject.message;
      errList[key] = propVal;
    }
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    errList['email'] = "Email already in use"
  }
  // console.log(errList)
  defaultError.list = errList
  //res.status(defaultError.statusCode).json({ msg: err })
  res.status(defaultError.statusCode).json({
    msg: defaultError.msg,
    list: defaultError.list
  })
}

export default errorHandlerMiddleware;