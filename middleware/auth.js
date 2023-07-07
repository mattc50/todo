import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  //console.log(req.cookies)
  const token = req.cookies.token
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