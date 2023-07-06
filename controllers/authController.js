import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
} from '../errors/index.js'
import attachCookies from '../utils/attachCookies.js';

const register = async (req, res) => {
  const { name, email, password } = req.body

  // the following 2 conditions serve to provide more succinct and user-friendly error messages.
  // if they omitted, the line under ⚑ in error-handler.js would be run
  if (!name || !email || !password) {
    // instead of going we next, we throw an error; this is because express-async-errors does the passing of the error to the next middleware for us
    throw new BadRequestError('Please provide all values');
  }

  const userAlreadyExists = await (User.findOne({ email }))
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user = await User.create(req.body)

  const token = user.createJWT();
  attachCookies({ res, token })

  res.status(StatusCodes.CREATED).json({
    //select: false does not work with User.create; therefore, to omit the password from responses, we have to hard-code the values we want to retrieve
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name
    },
    token
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT();
  user.password = undefined;
  attachCookies({ res, token })

  res.status(StatusCodes.OK).json({ user, token })

}

const updateUser = async (req, res) => {
  const { email, name, lastName } = req.body;
  if (!email || !name || !lastName) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;

  await user.save()
  // later, we will have user.save, and this will run the UserSchema.pre('save'...) function in User.js.
  // if we instead used User.findOneAndUpdate, the hook/middleware would not be run.

  // this new token is created to keep it up-to-date with the information.
  const token = user.createJWT();
  attachCookies({ res, token })

  res.status(StatusCodes.OK).json({ user, token })
}

export { register, login, updateUser }