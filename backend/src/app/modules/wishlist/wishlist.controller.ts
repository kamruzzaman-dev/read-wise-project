import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IWishlist } from './wishlist.interface';
import { WishlistService } from './wishlist.service';

const getWishlist: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await WishlistService.getWishlist(id);

  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'wishlist retrived successfully',
    data: result,
  });
});

const addToWishlist: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await WishlistService.addToWishlist(id, updateData);

  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to wishlist successfully',
    data: result,
  });
});

export const WishlistController = {
  getWishlist,
  addToWishlist,
};
