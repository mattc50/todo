import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes'
import attachCookies from '../utils/attachCookies.js';
// import { logout } from './authController.js';
import BadRequestError from '../errors/bad-request.js';
import Token from '../models/Token.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js'
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

const baseUrl = process.env.BASE_URL;
const url = process.env.NODE_ENV === 'production' ? 'toto-9ww4.onrender.com' : baseUrl

const requestPasswordReset = async (email) => {
  // const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new BadRequestError('There is no user with this email')

  const token = await Token.findOne({ userId: user._id })
  if (token) await token.deleteOne()

  const resetToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  )

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(resetToken, salt)

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save()

  // const env = window.location.origin;
  const link = `${url}/reset-password?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    [],
    {
      name: user.name,
      link: link
    },
    // "../utils/templates/requestResetPassword.handlebars"
    "../utils/templates/requestResetPassword.handlebars"
  )
  return link;
}

const resetPassword = async (userId, token, password) => {
  const passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) throw new BadRequestError("The link may be invalid or expired");

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) throw new BadRequestError("The link may be invalid or expired");

  const user = await User.findOne({ _id: userId });
  user.password = password;

  sendEmail(
    user.email,
    "Password Reset Successfully",
    [],
    {
      name: user.name,
      link: url
    },
    "../utils/templates/passwordReset.handlebars"
  );

  await user.save();

  await passwordResetToken.deleteOne();
  return { message: "Password reset was successful!" };

}

const checkToken = async (token, userId) => {
  const user = User.findOne({ _id: userId })
  if (!ObjectId.isValid(userId)) throw new BadRequestError('Invalid Set ID');
  if (!user) throw new BadRequestError("There is no user with this ID");

  const passwordResetToken = await Token.findOne({ userId })
  if (!passwordResetToken) throw new BadRequestError("The link may be invalid or expired");

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) throw new BadRequestError("The link may be invalid or expired");
  return isValid;
}

export { requestPasswordReset, resetPassword, checkToken }