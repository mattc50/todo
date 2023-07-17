import express from 'express';
const router = express.Router();

import {
  // testGet,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js'

router.route('/')
  // .get(testGet)
  .get(getTodos)
  .post(createTodo)
router.route('/:id')
  .delete(deleteTodo)
  .patch(updateTodo)


export default router;