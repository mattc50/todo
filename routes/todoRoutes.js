import express from 'express';
const router = express.Router();

import {
  // testGet,
  createTodo,
  getTodos,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  deleteTodos
} from '../controllers/todoController.js'
import checkURLMiddleware from '../middleware/check-url.js';
import authenticateUser from '../middleware/auth.js'


router.route('/')
  // .get(testGet)
  .post(
    // authenticateUser,
    createTodo
  )
router.route('/all')
  .get(
    // authenticateUser,
    getAllTodos
  )
router.route('/all/:id')
  .get(
    // authenticateUser,
    checkURLMiddleware,
    getTodos
  )
  .delete(
    // authenticateUser,
    deleteTodos
  )
router.route('/:id')
  .get(
    // authenticateUser,
    getTodo
  )
  .delete(
    // authenticateUser,
    deleteTodo
  )
  .patch(
    // authenticateUser,
    updateTodo
  )


export default router;