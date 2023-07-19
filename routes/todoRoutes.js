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
  .post(createTodo)
router.route('/all/:id').get(getTodos)
router.route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(updateTodo)


export default router;