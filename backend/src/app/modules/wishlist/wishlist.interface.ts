/* eslint-disable no-unused-vars */
// import { Model } from 'mongoose';

import { IBook } from '../book/book.interface';

export type IWishlist = {
  _id: string;
  userId: string;
  email: string;
  bookId?: string;
  wishlist: IBook[];
};

// export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
