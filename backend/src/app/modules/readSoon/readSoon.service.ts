/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IReadSoon } from './readSoon.interface';
import { ReadSoon } from './readSoon.model';
import { User } from '../user/user.model';

const getWishlist = async (id: string): Promise<IReadSoon | null> => {
  const result = await ReadSoon.findOne({ userId: id });

  return result;
};

const addToWishlist = async (
  id: string,
  payload: Partial<IReadSoon>
): Promise<IReadSoon | null> => {
  const isExist = await User.findOne({ _id: payload?.userId });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  const isWishlistExists = await ReadSoon.findOne({ userId: isExist?._id });

  let result;
  if (!isWishlistExists) {
    const data = {
      userId: isExist?._id,
      email: isExist?.email,
      readSoonList: payload?.bookId,
    };
    result = await ReadSoon.create(data);
  } else {
    result = await ReadSoon.findOneAndUpdate(
      { userId: isExist?._id },
      { $push: { readSoonList: payload?.bookId } },
      {
        new: true,
      }
    );
  }

  return result;
};

const finishedReading = async (
  id: string,
  payload: { userId: string; finished: boolean }
): Promise<IReadSoon | null> => {
  const isExist = await User.findOne({ _id: payload?.userId });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  const isWishlistExists = await ReadSoon.findOne({ userId: isExist?._id });

  if (!isWishlistExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You do not have any read soon list'
    );
  }

  const result = await ReadSoon.findOneAndUpdate(
    { userId: isExist?._id, 'readSoonList._id': id },
    { $set: { 'readSoonList.$.finishedReading': payload.finished } },
    { new: true }
  );

  return result;
};

export const WishlistService = {
  getWishlist,
  addToWishlist,
  finishedReading,
};
