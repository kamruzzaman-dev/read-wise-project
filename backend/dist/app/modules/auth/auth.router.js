"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.authValidation.createUserZodSchema), auth_controller_1.AuthController.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginUserZodSchema), auth_controller_1.AuthController.login);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post('/google_auth', auth_controller_1.AuthController.googleAuth);
exports.AuthRouter = router;
