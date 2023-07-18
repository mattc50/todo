import express from 'express';
const router = express.Router();

// imported controller functions
import { createSet, getSets } from '../controllers/setController.js';

router.route('/')
  .get(getSets)
  .post(createSet)

export default router;