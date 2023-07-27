import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Please provide name (at least 3 characters)'
    ],
    minlength: [
      3,
      // 'Please provide name (at least 3 characters)'
      'Name must be at least 3 characters'
    ],
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    unique: true
  },
  password: {
    type: String,
    required: [
      true,
      'Please provide password (at least 6 characters)'],
    minlength: [
      6,
      // 'Please provide password (at least 6 characters)'
      'Password must be at least 6 characters'
    ],
    select: false
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName'
  },
  profPic: {
    type: Map,
    of: String,
    default: null
  }
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    // _id comes from the ID assigned to data by MongoDB
    { userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

// if passwords don't match, a 401 error will be thrown.
// "this" is used because the function is an instance method, and password refers to the value within the object itself.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

export default mongoose.model('User', UserSchema)