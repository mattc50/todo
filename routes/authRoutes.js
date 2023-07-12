import express from 'express';
const router = express.Router();

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import errorHandlerMiddleware from '../middleware/error-handler.js';
import userHandler from '../middleware/user-handler.js'

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update').patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(
  authenticateUser,
  //userHandler,
  getCurrentUser
)

export default router;