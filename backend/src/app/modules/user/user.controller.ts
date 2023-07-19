import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import { pick } from '../../../shared/pick';
import { UserFilterableFields } from './user.constants';
import { paginationFields } from '../../../constants/pagination';

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, UserFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrived successfully',
    data: result,
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await UserService.updateUser(id, updateData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully',
    data: result,
  });
});

const getMyProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserService.getMyProfile(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

const updateMyProfile: RequestHandler = catchAsync(async (req, res) => {
  const { ...updateData } = req.body;
  const user = req.user;

  const result = await UserService.updateMyProfile(user, updateData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information updated successfully",
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
