import express from 'express';
const router = express.Router();

// imported controller functions
import { createSet, getSets, getSet, updateSet } from '../controllers/setController.js';

router.route('/')
  .get(getSets)
  .post(createSet)
router.route('/:id')
  .get(getSet)
  .patch(updateSet)

export default router;