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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const user_constants_1 = require("./user.constants");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const bcryptHelpers_1 = require("../../../helper/bcryptHelpers");
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constants_1.UserSearchableFields === null || user_constants_1.UserSearchableFields === void 0 ? void 0 : user_constants_1.UserSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updateUserData = Object.assign({}, userData);
    // dynamically handling nested fields
    if (name && ((_a = Object.keys(name)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updateUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ _id: id });
    return result;
});
const getMyProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    result = yield user_model_1.User.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.id });
    return result;
});
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const isExist = yield user_model_1.User.findOne({ _id: user === null || user === void 0 ? void 0 : user.id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    }
    const { name, password } = payload, userData = __rest(payload, ["name", "password"]);
    const updateUserData = Object.assign({}, userData);
    // dynamically handling nested fields
    if (name && ((_b = Object.keys(name)) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    // hash the password before updating
    if (password) {
        updateUserData['password'] = yield bcryptHelpers_1.bcryptHelpers.hashPassword(password);
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: user === null || user === void 0 ? void 0 : user.id }, updateUserData, {
        new: true,
    });
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
