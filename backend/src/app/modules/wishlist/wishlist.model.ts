/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';
import { IWishlist } from './wishlist.interface';

const { Schema } = mongoose;

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [Object],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);
