import { requestPasswordReset, resetPassword, checkToken } from '../services/authService.js';

const passwordResetRequestController = async (req, res) => {
  const { email } = req.body;

  const requestPasswordResetService = await requestPasswordReset(
    email
  );
  return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res) => {
  const { userId, token, password } = req.body;

  const resetPasswordService = await resetPassword(
    userId,
    token,
    password
  );
  return res.json(resetPasswordService);
}

const checkTokenController = async (req, res) => {
  const { token, id } = req.params;
  const validToken = await checkToken(token, id);
  return res.json(validToken);
}

export { passwordResetRequestController, resetPasswordController, checkTokenController }