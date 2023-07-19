import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { wishlistValidation } from './readSoon.validation';
import { WishlistController } from './readSoon.controller';
const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.USER), WishlistController.getWishlist);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(wishlistValidation.wishlistZodSchema),
  WishlistController.addToWishlist
);

router.patch(
  '/finished-reading/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(wishlistValidation.finishedReadingZodSchema),
  WishlistController.finishedReading
);

export const readSoonRouter = router;
