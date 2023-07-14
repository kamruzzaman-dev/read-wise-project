import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload

  const user = new User() // creating instance of a user.

  // checking user by custom our created instance methods
  const isUserExist = await user.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // isMatching password
  const isPasswordMatch =
    isUserExist.password &&
    (await user.isPasswordMatch(password, isUserExist.password))
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect')
  }

  const { _id, role } = isUserExist

  // create JWT token
  const accessToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiries_in as string
  )

  // created refresh token
  const refreshToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiries_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
    //
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh Token')
  }
  const { _id } = verifiedToken
  const user = new User() // creating instance of a user.

  const isUserExist = await user.isUserExistByID(_id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new token

  // create JWT token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiries_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  login,
  refreshToken,
}
