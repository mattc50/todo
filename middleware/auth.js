import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from 'http-status-codes'

const auth = async (req, res, next) => {

  // ADDITION:  the below code will split the referer (essentially the 
  //            full URL of the request) and find which page the request 
  //            is coming from.
  const tail = req.headers.referer;
  const urlSplit = tail.split('/');
  const page = urlSplit[urlSplit.length - 1];

  //console.log(req.cookies)
  const token = req.cookies.token

  // ADDITION:  if there is no token, the page is either landing or 
  //            register, and the request URL is getCurrentUser, the next 
  //            middleware will be run, and the auth will be exited out of.
  //            NOTE: by checking if there is a token and in only that
  //            condition verifying the token, not only is an 
  //            Authentication Error prevented upon start of the server, 
  //            but the below condition may not be required.
  if ((page === 'landing' || page === 'register') && !token && req.url === '/getCurrentUser') {
    next()
    return
  };

  try {
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = payload
    }
    next()
  } catch (error) {
    console.log('this ran')
    throw new UnauthenticatedError('Authentication Failed')
  }
}

export default auth;