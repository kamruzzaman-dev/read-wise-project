"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadSoon = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const readSoonSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ReadSoon = mongoose_1.default.model('ReadSoon', readSoonSchema);
