"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const book_model_1 = require("./book.model");
const book_constants_1 = require("./book.constants");
const user_model_1 = require("../user/user.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({ _id: payload.creator });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constants_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                return {
                    [field]: value,
                };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereCondition)
        .populate('reviews')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate('reviews');
    return result;
});
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is the owner of this cow or not.
    const isUserMatch = yield book_model_1.Book.findOne({
        $and: [{ _id: id }, { creator: user && (user === null || user === void 0 ? void 0 : user.id) }],
    });
    if (!isUserMatch) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'your are not authorized to delete this book.');
    }
    const result = yield book_model_1.Book.findByIdAndDelete(id).populate('reviews');
    return result;
});
const updateBook = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'cow not found');
    }
    // check if the user is the owner of this cow or not.
    const isUserMatch = yield book_model_1.Book.findOne({
        $and: [{ _id: id }, { creator: user && (user === null || user === void 0 ? void 0 : user.id) }],
    });
    if (!isUserMatch) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'your are not authorized to update this cow');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('reviews');
    return result;
});
const addReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'book not found');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: payload } }, {
        new: true,
    }).populate('reviews');
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    updateBook,
    addReview,
};
