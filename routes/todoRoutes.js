import express from 'express';
const router = express.Router();

import {
  // testGet,
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js'

router.route('/')
  // .get(testGet)
  .get(getTodos)
  .post(createTodo)
router.route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(updateTodo)


export default router;