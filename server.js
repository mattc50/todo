//console.log("server running...")
//import cors from 'cors'

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import cookieParser from 'cookie-parser'

// db
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import setRouter from './routes/setRoutes.js';

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js'

//app.use(cors())
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// makes JSON data available in the controllers
app.use(express.json())

app.use(cookieParser())

// secures headers
app.use(helmet())
// sanitizes input (prevents cross-side scripting attacks)
app.use(xss())
//prevents MongoDB operator injection
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/todo', authenticateUser, todoRouter)
app.use('/api/v1/set', authenticateUser, setRouter)

// app.get('/api/v1', (req, res) => {
//   res.json({ msg: 'API' });
// });

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