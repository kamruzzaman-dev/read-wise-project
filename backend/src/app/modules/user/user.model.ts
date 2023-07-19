/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../../config';
const { Schema } = mongoose;

const userSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: role,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password; // Exclude password field from the response
      },
    },
  }
);

userSchema.methods.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'role' | 'password' | '_id'> | null> {
  return await User.findOne(
    { email: email },
    { _id: 1, role: 1, password: 1 }
  ).select('+password');
};

userSchema.methods.isPasswordMatch = function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hash the password before saving into the database
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
