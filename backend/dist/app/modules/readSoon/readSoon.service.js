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
exports.ReadSoonListService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const readSoon_model_1 = require("./readSoon.model");
const user_model_1 = require("../user/user.model");
const getReadSoonList = (requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readSoon_model_1.ReadSoon.findOne({ userId: requestedUser.id });
    return result;
});
const addToReadSoonList = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.userId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    }
    const isReadSoonListExists = yield readSoon_model_1.ReadSoon.findOne({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id });
    const matching = payload.id;
    let result;
    if (!isReadSoonListExists) {
        const data = {
            userId: isExist === null || isExist === void 0 ? void 0 : isExist._id,
            email: isExist === null || isExist === void 0 ? void 0 : isExist.email,
            readSoonList: payload === null || payload === void 0 ? void 0 : payload.bookId,
        };
        result = yield readSoon_model_1.ReadSoon.create(data);
    }
    else {
        const isReadSoonBookExists = isReadSoonListExists.readSoonList.find(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        r => r._id.toString() === matching.toString());
        if (!isReadSoonBookExists) {
            result = yield readSoon_model_1.ReadSoon.findOneAndUpdate({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id }, { $push: { readSoonList: payload === null || payload === void 0 ? void 0 : payload.bookId } }, {
                new: true,
            });
        }
        else {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'This book already in the read soon list.');
        }
    }
    return result;
});
const finishedReading = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.userId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    }
    const isWishlistExists = yield readSoon_model_1.ReadSoon.findOne({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id });
    if (!isWishlistExists) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'You do not have any read soon list');
    }
    const result = yield readSoon_model_1.ReadSoon.findOneAndUpdate({ userId: isExist === null || isExist === void 0 ? void 0 : isExist._id, 'readSoonList._id': id }, { $set: { 'readSoonList.$.finishedReading': payload.finished } }, { new: true });
    return result;
});
exports.ReadSoonListService = {
    getReadSoonList,
    addToReadSoonList,
    finishedReading,
};
