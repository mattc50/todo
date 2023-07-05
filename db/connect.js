import mongoose from 'mongoose';

const connectDB = (url) => {
  // connecting to a non-default DB: 
  // https://stackoverflow.com/a/69615970
  return mongoose.connect(url, { dbName: 'todo' })
}

export default connectDB