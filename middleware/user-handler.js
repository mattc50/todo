import { UnauthenticatedError } from "../errors/index.js"

const userHandler = (req, res, next) => {
  const tail = req.headers.referer;
  const urlSplit = tail.split('/');
  const page = urlSplit[urlSplit.length - 1];
  console.log('run')
  if ((page === 'landing' || page === 'register') && req.url === '/getCurrentUser') {
    console.log('ok')
    return;
  }
  throw new UnauthenticatedError('Authentication Failed')
}

export default userHandler;