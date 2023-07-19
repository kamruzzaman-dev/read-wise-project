import mongoose from 'mongoose';
import { BookModel, IBook } from './book.interface';
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: Date,
      required: true,
    },
    publication_year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    reviews: [
      {
        userName: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        userEmail: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = mongoose.model<IBook, BookModel>('Book', bookSchema);
