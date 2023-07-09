import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const tail = req.headers.referer;
  const urlSplit = tail.split('/');
  const page = urlSplit[urlSplit.length - 1];

  //console.log(req.cookies)
  const token = req.cookies.token

  //console.log(token) 
  //if ((page === 'landing' || page === 'register') && !token && req.url === '/getCurrentUser') return;

  if (!token) {
    throw new UnauthenticatedError('Authentication Failed')
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Failed')
  }
}

export default auth;