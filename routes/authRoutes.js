import express from 'express';
const router = express.Router();

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
  // uploadProfPic
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import errorHandlerMiddleware from '../middleware/error-handler.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update').patch(authenticateUser, updateUser);
router.route('/upload').patch(
  authenticateUser,
  // uploadProfPic
)
router.route('/getCurrentUser').get(
  authenticateUser,
  getCurrentUser
)

export default router;