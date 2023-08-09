import express from 'express';
const router = express.Router();

import {
  createTodo,
  getTodos,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js'
import checkURLMiddleware from '../middleware/check-url.js';

router.route('/')
  .post(createTodo)
router.route('/all')
  .get(getAllTodos)
router.route('/all/:id')
  .get(checkURLMiddleware, getTodos)
router.route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(updateTodo)

export default router;