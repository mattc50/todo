import Todo from '../models/Todo.js'
import User from '../models/User.js'
import Set from '../models/Set.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
} from '../errors/index.js'
import moment from 'moment'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

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
  const { id: setId } = req.params;

  const set = await Set.findById({ _id: setId });

  const setQuery = {
    belongsTo: { $in: [setId] },
    createdBy: req.user.userId
  }
  const countQuery = {
    belongsTo: { $in: [setId] },
    status: true,
    createdBy: req.user.userId
  }
  const result = await Todo.find(setQuery)

  const todos = await result

  const todosOfSet = set.todos;
  const todoIdsInSet = result.map(todo => todo._id);

  // const nullsFiltered = todoIdsInSet
  //   .filter(todo => todosOfSet.some(el => el == todo))

  const totalTodos = await Todo.countDocuments(setQuery)
  const doneTodos = await Todo.countDocuments(countQuery)

  // console.log('ran from todoController')
  res.status(StatusCodes.OK).json({
    todos,
    totalTodos,
    doneTodos,
    todosOfSet,
    todoIdsInSet,
    // nullsFiltered,
    set
  })
}

const getAllTodos = async (req, res) => {
  const setQuery = {
    createdBy: req.user.userId
  }
  const countQuery = {
    status: true,
    createdBy: req.user.userId
  }
  const result = await Todo.find(setQuery)

  const todos = await result;

  const totalTodos = await Todo.countDocuments(setQuery)
  const doneTodos = await Todo.countDocuments(countQuery)

  res.status(StatusCodes.OK).json({
    todos,
    totalTodos,
    doneTodos
  })
}

const getTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId })
  if (!todo) {
    throw new BadRequestError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
}

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  // const { status } = req.body;

  const todo = await Todo.findOne({ _id: todoId })
  if (!todo) {
    throw new BadRequestError(`No todo with id ${todoId}`)
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
    throw new NotFoundError(`No todo with id ${todoId}`);
  }
  await todo.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Success! Todo removed' })
}

const deleteTodos = async (req, res) => {
  const { id: setId } = req.params;
  await Todo.deleteMany({ belongsTo: { $in: [setId] } })
  res.status(StatusCodes.OK).json({ msg: 'Success! Todos removed' })
}

export {
  // testGet,
  createTodo,
  getTodos,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  deleteTodos
}