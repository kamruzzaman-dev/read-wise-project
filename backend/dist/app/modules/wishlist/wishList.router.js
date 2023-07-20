"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), wishlist_controller_1.WishlistController.getWishlist);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(wishlist_validation_1.wishlistValidation.wishlistZodSchema), wishlist_controller_1.WishlistController.addToWishlist);
exports.WishlistRouter = router;
