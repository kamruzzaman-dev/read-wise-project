import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { readSoonListValidation } from './readSoon.validation'
import { readSoonController } from './readSoon.controller'
const router = express.Router()

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  readSoonController.getReadSoonList
)

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(readSoonListValidation.ReadSoonListZodSchema),
  readSoonController.addToReadSoonList
)

router.patch(
  '/finished-reading/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(readSoonListValidation.finishedReadingZodSchema),
  readSoonController.finishedReading
)

export const readSoonRouter = router
