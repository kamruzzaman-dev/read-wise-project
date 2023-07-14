import express from 'express'
import { requestValidation } from '../../middleware/validationRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import { UserValidation } from '../user/user.validation'
import { UserController } from '../user/user.controllers'
const router = express.Router()

router.post(
  '/login',
  requestValidation.validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
)

router.post(
  '/signup',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

router.post(
  '/refresh-token',
  // requestValidation.validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

// router.get("/get-all-user", AuthController.getAllUser);

export const AuthRoutes = router
