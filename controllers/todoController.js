import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const testGet = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ msg: user ? 'user found' : 'could not find user' })
}

export { testGet }