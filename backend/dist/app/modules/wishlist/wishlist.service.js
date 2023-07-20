"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const wishlist_model_1 = require("./wishlist.model");
const user_model_1 = require("../user/user.model");
const getWishlist = (requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.findOne({ userId: requestedUser.id });
    return result;
});
const addToWishlist = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.userId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    }
    const isWishlistExists = yield wishlist_model_1.Wishlist.findOne({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id });
    let result;
    if (!isWishlistExists) {
        const data = {
            userId: isExist === null || isExist === void 0 ? void 0 : isExist._id,
            email: isExist === null || isExist === void 0 ? void 0 : isExist.email,
            wishlist: payload === null || payload === void 0 ? void 0 : payload.bookId,
        };
        result = yield wishlist_model_1.Wishlist.create(data);
    }
    else {
        result = yield wishlist_model_1.Wishlist.findOneAndUpdate({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id }, { $push: { wishlist: payload === null || payload === void 0 ? void 0 : payload.bookId } }, {
            new: true,
        });
    }
    return result;
});
exports.WishlistService = {
    getWishlist,
    addToWishlist,
};
