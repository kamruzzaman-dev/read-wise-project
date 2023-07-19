import { Model } from 'mongoose';

export type IReview = {
  userName: string;
  review: string;
  userEmail: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  publication_year: string;
  image: string;
  creator: string;
  reviews?: IReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilter = {
  searchTerm?: string;
  location?: string;
  price?: string;
  age?: number;
  name?: string;
  breed?: string;
  weight?: number;
  category?: string;
};
