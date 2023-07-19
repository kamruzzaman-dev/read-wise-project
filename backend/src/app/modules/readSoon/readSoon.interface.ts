/* eslint-disable no-unused-vars */
// import { Model } from 'mongoose';

import { IReview } from '../book/book.interface';

export type IReadSoonBook = {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  publication_year: string;
  image: string;
  creator: string;
  reviews?: IReview[];
  finishedReading: boolean;
};

export type IReadSoon = {
  _id: string;
  userId: string;
  email: string;
  bookId?: string;
  readSoonList: IReadSoonBook[];
};

// export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
