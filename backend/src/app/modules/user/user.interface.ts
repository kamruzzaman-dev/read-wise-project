import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IUser = {
  id: string
  _id: string
  role: 'seller' | 'buyer'
  phoneNumber: string
  password: string
  name: UserName
  gender: 'male' | 'female'
  address: string
  budget: number
  income: number
}

export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>
  isUserExistByID(id: string): Promise<Partial<IUser> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
