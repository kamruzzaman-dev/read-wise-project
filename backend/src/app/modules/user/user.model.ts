import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { gender } from './user.constants'
import bcrypt from 'bcrypt'
import config from '../../../config'

const UserSchema = new Schema<IUser>(
  {
    role: { type: String, enum: ['seller', 'buyer'], required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    gender: { type: String, enum: gender },
    address: { type: String },
    budget: { type: Number },
    income: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

UserSchema.pre('save', async function (next) {
  //hashing user password.
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

UserSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { phoneNumber },
    { id: 1, password: 1, role: 1 }
  ).lean()
  return user
}

UserSchema.methods.isUserExistByID = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findById(id, { id: 1, password: 1, role: 1 }).lean()
  return user
}

UserSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword)
  return isMatched
}

export const User = model<IUser, UserModel>('User', UserSchema)
