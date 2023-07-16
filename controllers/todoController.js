import Todo from '../models/Todo.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
} from '../errors/index.js'
import moment from 'moment'


const testGet = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ msg: user ? 'user found' : 'could not find user' })
}

// createTodo
const createTodo = async (req, res) => {
  const { task } = req.body

  if (!task) {
    throw new BadRequestError('Please provide task')
  }

  req.body.createdBy = req.user.userId
  const todo = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ todo })
}

// getTodos
const getTodos = async (req, res) => {
  const queryObject = { createdBy: req.user.userId }
  let result = await Todo.find(queryObject)
  const todos = await result

  const totalTodos = await Todo.countDocuments(queryObject)

  res.status(StatusCodes.OK).json({ todos, totalTodos })
}

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const { status } = req.body;

  const todo = await Todo.findOne({ _id: todoId })
  if (!todo) {
    throw new BadRequestError(`No job with id ${todoId}`)
  }

  const updatedTodo = await (Todo.findOneAndUpdate({ _id: todoId }, req.body, {
    new: true,
    runValidators: true
  }))
  res.status(StatusCodes.OK).json({ updatedTodo })
}

// deleteTodo

// updateTodo

export { testGet, createTodo, getTodos, updateTodo }