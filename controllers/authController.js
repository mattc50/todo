import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
} from '../errors/index.js'
import attachCookies from '../utils/attachCookies.js';
import sendEmail from '../utils/sendEmail.js'

const baseUrl = process.env.BASE_URL;
const url = process.env.NODE_ENV === 'production' ? 'toto-9ww4.onrender.com' : baseUrl

const register = async (req, res) => {
  const { name, email, password } = req.body

  //  ⚑
  //  the following condition serves to provide more succinct and 
  //  user-friendly error messages. They also allow the per-field 
  //  validation to work correctly.
  //  if they are omitted, the line under ⚑ in error-handler.js would be 
  //  run.
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

  sendEmail(
    user.email,
    "Password Reset Successfully",
    [{
      filename: 'welcome-email.png',
      cid: 'welcome-email'
    }],
    {
      name: user.name,
      link: url
    },
    "../utils/templates/register.handlebars"
  );

  res.status(StatusCodes.CREATED).json({
    //select: false does not work with User.create; therefore, to omit the password from responses, we have to hard-code the values we want to retrieve
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name
    },
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

  res.status(StatusCodes.OK).json({ user })

}

const updateUser = async (req, res) => {
  const { email, name, lastName, profPic } = req.body;
  if (!email || !name || !lastName) {
    throw new BadRequestError('Please provide all values')
  }

  for (const el in profPic) {
    const str = profPic[el]
    const stringSlice = str.split('/')[0];
    if (stringSlice !== 'data:image') {
      throw new BadRequestError('Please provide an image')
    }

    const magicNum = str.charAt(str.indexOf(',') + 1)
    if (magicNum !== '/' && magicNum !== 'i' && magicNum !== 'R') {
      throw new BadRequestError('Please provide a JPEG, JPG, PNG, or GIF')
    }
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.profPic = profPic;

  await user.save()
  // later, we will have user.save, and this will run the UserSchema.pre('save'...) function in User.js.
  // if we instead used User.findOneAndUpdate, the hook/middleware would not be run.

  // this new token is created to keep it up-to-date with the information.
  const token = user.createJWT();
  attachCookies({ res, token })

  res.status(StatusCodes.OK).json({ user })
}

// const uploadProfPic = async (req, res) => {
//   const { profPic } = req.body;
//   try {
//     const user = await User.findOne({ _id: req.user.userId });

//     user.profPic = profPic;
//     await user.save()
//     res.status(200).json({ msg: "image uploaded to user" })
//   } catch (error) {
//     res.status(409).json({ msg: error.message })
//   }

// }

const getCurrentUser = async (req, res) => {

  // ADDITION:    we check if there is a token present in the request 
  //              cookies.
  //              if there is NOT a cookie present, then the response is 
  //              OK, because we do not want to respond with a 401 error 
  //              if the user is on the login or register page, which 
  //              would only be possible without a token.
  //              Then, we return to prevent user from being retrieved, as 
  //              this would throw an error and be responded with 401, 
  //              which is not what we want.
  const token = req.cookies.token;
  if (!token) {
    res.status(StatusCodes.OK).json({ msg: 'OK' })
    return
  }

  const user = await User.findOne({ _id: req.user.userId })

  res.status(StatusCodes.OK).json({ user })
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
  // uploadProfPic 
}