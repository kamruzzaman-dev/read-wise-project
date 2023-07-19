import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  IRefreshTokenResponse,
  IUserLogin,
  IUserLoginResponse,
  IUserSignupResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createUser = async (payload: IUser): Promise<IUserSignupResponse> => {
  const result = await User.create(payload);
  let accessToken;
  let refreshToken;
  if (result) {
    accessToken = jwtHelpers.createToken(
      {
        id: result._id,
        role: result.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    refreshToken = jwtHelpers.createToken(
      {
        id: result._id,
        role: result.role,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  }
  return { result, refreshToken, accessToken };
};

const login = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
  const user = new User();
  const isUserExist = await user.isUserExist(payload.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(payload.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  const userData = await User.findOne({ _id: isUserExist._id });

  return {
    userData,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { id, role } = verifiedToken;

  // check if user exists of not
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: id,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  createUser,
  login,
  refreshToken,
};
