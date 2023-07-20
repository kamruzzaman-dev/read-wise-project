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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable no-constant-condition */
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const user_model_1 = require("../user/user.model");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const google_auth_library_1 = require("google-auth-library");
// oauthj cilent code
const cilent = new google_auth_library_1.OAuth2Client('902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com');
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    let accessToken;
    let refreshToken;
    if (result) {
        accessToken = jwtHelpers_1.jwtHelpers.createToken({
            id: result._id,
            role: result.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            id: result._id,
            role: result.role,
        }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    }
    return { result, refreshToken, accessToken };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(payload.email);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(yield user.isPasswordMatch(payload.password, isUserExist.password))) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const userData = yield user_model_1.User.findOne({ _id: isUserExist._id });
    return {
        userData,
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    const { id, role } = verifiedToken;
    // check if user exists of not
    const isUserExist = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: id,
        role: role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const googleAuth = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cilent.verifyIdToken({
            idToken: tokenId,
            audience: '733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com',
        });
        const payload = response.getPayload();
        if (!payload) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Payload not found!');
        }
        const { name, email, email_verified, family_name } = payload;
        if (!email_verified) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Cannot login! Try a different way.');
        }
        let userExists = yield user_model_1.User.findOne({ email: email });
        if (!userExists) {
            userExists = yield user_model_1.User.create({
                name: name,
                email: email,
                password: family_name + '@1234',
                role: 'user',
                phone: email,
            });
        }
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({
            id: userExists._id,
            role: userExists.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            id: userExists._id,
            role: userExists.role,
        }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            userData: userExists,
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong.');
    }
});
exports.AuthService = {
    createUser,
    login,
    refreshToken,
    googleAuth,
};
