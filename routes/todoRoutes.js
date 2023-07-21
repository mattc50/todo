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

router.route('/')
  // .get(testGet)
  .post(createTodo)
router.route('/all').get(getAllTodos)
router.route('/all/:id')
  .get(getTodos)
  .delete(deleteTodos)
router.route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(updateTodo)


export default router;