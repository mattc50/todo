//console.log("server running...")

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

// db
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// makes JSOB data available in the controllers
app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

