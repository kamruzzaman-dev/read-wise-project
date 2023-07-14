import express from 'express'
import { UserController } from './user.controllers'
import { UserValidation } from './user.validation'
import { requestValidation } from '../../middleware/validationRequest'
const router = express.Router()

router.post(
  '/user-create',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)
router.get('/', UserController.getAllUsers)
router.get(
  '/my-profile',
  UserController.getMyProfile
)

export const UserRoutes = router
