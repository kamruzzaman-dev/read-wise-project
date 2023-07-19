/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  password: string;
  role: 'user' | 'admin';
  name: string;
  email: string;
  phone: string;
};

export type IUserMethods = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'role' | 'password' | '_id'> | null>;

  isPasswordMatch(givenPassword: string, savedPassword: string): boolean;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilter = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
};
