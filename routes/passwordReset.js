import express from 'express';
const router = express.Router();

import { passwordResetRequestController, resetPasswordController, checkTokenController } from '../controllers/resetPasswordController.js'

// send password link
router.route('/request-reset').post(passwordResetRequestController);
router.route('/reset-password').post(resetPasswordController);
router.route('/reset-password/:token/:id').get(checkTokenController)

export default router;