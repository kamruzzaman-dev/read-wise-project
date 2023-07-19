import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.createUserZodSchema),
  AuthController.createUser
);

router.post(
  '/login',
  validateRequest(authValidation.loginUserZodSchema),
  AuthController.login
);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRouter = router;
