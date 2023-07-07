import express from 'express';
const router = express.Router();

import {
  testGet
} from '../controllers/todoController.js'

router.route('/').get(testGet);

export default router;