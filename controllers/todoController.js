import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const testGet = async (req, res) => {
  console.log('running from testGet in controller')
  const user = await User.findOne({ _id: "64a6d75d68e31e512669892f" })
  res.status(StatusCodes.OK).json({ msg: user ? 'user found' : 'could not find user' })
}

export { testGet }