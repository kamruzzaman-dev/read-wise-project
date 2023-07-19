/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';
import { IReadSoon } from './readSoon.interface';

const { Schema } = mongoose;

const BookSchema = {
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
  finishedReading: {
    type: Boolean,
    default: false,
  },
};

const readSoonSchema = new Schema<IReadSoon>(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    readSoonList: {
      type: [BookSchema],
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

export const ReadSoon = mongoose.model<IReadSoon>('ReadSoon', readSoonSchema);
