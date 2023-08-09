import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP address. Please try again after 15 minutes.'
})

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
  // uploadProfPic
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import errorHandlerMiddleware from '../middleware/error-handler.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);
router.route('/update').patch(authenticateUser, updateUser);
router.route('/upload').patch(authenticateUser)
router.route('/getCurrentUser').get(
  authenticateUser,
  getCurrentUser
)

export default router;