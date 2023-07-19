/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';
import { User } from '../user/user.model';

const getWishlist = async (id: string): Promise<IWishlist | null> => {
  const result = await Wishlist.findOne({ userId: id });

  return result;
};

const addToWishlist = async (
  id: string,
  payload: Partial<IWishlist>
): Promise<IWishlist | null> => {
  const isExist = await User.findOne({ _id: payload?.userId });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  const isWishlistExists = await Wishlist.findOne({ userId: isExist?._id });

  let result;
  if (!isWishlistExists) {
    const data = {
      userId: isExist?._id,
      email: isExist?.email,
      wishlist: payload?.bookId,
    };
    result = await Wishlist.create(data);
  } else {
    result = await Wishlist.findOneAndUpdate(
      { userId: isExist?._id },
      { $push: { wishlist: payload?.bookId } },
      {
        new: true,
      }
    );
  }

  return result;
};

export const WishlistService = {
  getWishlist,
  addToWishlist,
};
