import express from 'express';
const router = express.Router();

// imported controller functions
import { createSet, getSets, getSet, updateSet, deleteSet } from '../controllers/setController.js';

router.route('/')
  .get(getSets)
  .post(createSet)
router.route('/:id')
  .get(getSet)
  .patch(updateSet)
  .delete(deleteSet)

export default router;