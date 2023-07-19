import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilter } from './book.interface';
import { Book } from './book.model';
import { bookSearchableFields } from './book.constants';
import { User } from '../user/user.model';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const user = await User.find({ _id: payload.creator });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (
  filters: IBookFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return {
          [field]: value,
        };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .populate('reviews')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('reviews');
  return result;
};

const deleteBook = async (
  id: string,
  user: JwtPayload | null
): Promise<IBook | null> => {
  // check if the user is the owner of this cow or not.
  const isUserMatch = await Book.findOne({
    $and: [{ _id: id }, { creator: user && user?.id }],
  });
  if (!isUserMatch) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'your are not authorized to delete this book.'
    );
  }

  const result = await Book.findByIdAndDelete(id).populate('reviews');
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'cow not found');
  }

  // check if the user is the owner of this cow or not.
  const isUserMatch = await Book.findOne({
    $and: [{ _id: id }, { creator: user && user?.id }],
  });

  if (!isUserMatch) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'your are not authorized to update this cow'
    );
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('reviews');

  return result;
};

const addReview = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'book not found');
  }
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  ).populate('reviews');

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  addReview,
};
