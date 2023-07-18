import Todo from '../models/Todo.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
} from '../errors/index.js'
import moment from 'moment'

const createTodo = async (req, res) => {
  const { task } = req.body

  if (!task) {
    throw new BadRequestError('Please provide task')
  }

  req.body.createdBy = req.user.userId
  const todo = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ todo })
}

const getTodos = async (req, res) => {
  const userQuery = { createdBy: req.user.userId }
  const countQuery = { status: true, createdBy: req.user.userId }
  const result = await Todo.find(userQuery)
  const todos = await result

  const totalTodos = await Todo.countDocuments(userQuery)
  const doneTodos = await Todo.countDocuments(countQuery)

  res.status(StatusCodes.OK).json({ todos, totalTodos, doneTodos })
}

const getTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId })
  if (!todo) {
    throw new BadRequestError(`No job with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
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

const deleteTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId })
  if (!todo) {
    throw new NotFoundError(`No job with id ${todoId}`);
  }
  await todo.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Success! Todo removed' })
}

export {
  // testGet,
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
}