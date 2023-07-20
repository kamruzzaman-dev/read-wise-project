"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSoonRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const readSoon_validation_1 = require("./readSoon.validation");
const readSoon_controller_1 = require("./readSoon.controller");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), readSoon_controller_1.readSoonController.getReadSoonList);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(readSoon_validation_1.readSoonListValidation.ReadSoonListZodSchema), readSoon_controller_1.readSoonController.addToReadSoonList);
router.patch('/finished-reading/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(readSoon_validation_1.readSoonListValidation.finishedReadingZodSchema), readSoon_controller_1.readSoonController.finishedReading);
exports.readSoonRouter = router;
