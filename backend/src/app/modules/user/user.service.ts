/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IUser } from './user.interface'
import { User } from './user.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IGenericResponse } from '../../../interface/error'


const createUser = async (user: IUser): Promise<IUser | null> => {
  let newUserData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserData) {
    newUserData = await User.findOne({ _id: newUserData._id }).select({
      password: 0,
    })
  }

  return newUserData
}

const getAllUsers = async (): Promise<IGenericResponse<IUser[]>> => {
  const result = await User.find().sort()
  const total = await User.countDocuments()
  return {
    meta: {
      page: 1,
      limit: 2,
      total,
    },
    data: result,
  }
}

const getMyProfile = async (requestedUser: any): Promise<IUser | null> => {
  const result = await User.findById(requestedUser._id).select('-password')

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }
  return result
}


export const UserService = {
  createUser,
  getAllUsers,
  getMyProfile,
}
