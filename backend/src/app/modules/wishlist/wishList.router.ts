import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { wishlistValidation } from './wishlist.validation';
import { WishlistController } from './wishlist.controller';
const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.USER), WishlistController.getWishlist);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(wishlistValidation.wishlistZodSchema),
  WishlistController.addToWishlist
);

export const WishlistRouter = router;
