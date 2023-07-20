"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../modules/auth/auth.router");
const user_router_1 = require("../modules/user/user.router");
const book_router_1 = require("../modules/book/book.router");
const wishList_router_1 = require("../modules/wishlist/wishList.router");
const readSoon_router_1 = require("../modules/readSoon/readSoon.router");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/auth', router: auth_router_1.AuthRouter },
    { path: '/users', router: user_router_1.UserRouter },
    { path: '/books', router: book_router_1.BookRouter },
    { path: '/wishlist', router: wishList_router_1.WishlistRouter },
    { path: '/readSoon', router: readSoon_router_1.readSoonRouter },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
exports.default = router;
