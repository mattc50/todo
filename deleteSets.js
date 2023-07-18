import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Set from './models/Set.js'

const start = async () => {
  try {
    // connect to the database
    await connectDB(process.env.MONGO_URI)
    // delete all the jobs
    await Set.deleteMany();

    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()