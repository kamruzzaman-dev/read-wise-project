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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
// Handling uncaught exceptions
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            console.log('Database connection established 😇');
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Server is running on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log('Failed to connect to database', error);
        }
        // Gracefully shutting down the server in case of unhandled rejection
        process.on('unhandledRejection', error => {
            console.log(error);
            if (server) {
                // Close the server and log the error
                server.close(() => {
                    console.log(error);
                    process.exit(1);
                });
            }
            else {
                // If server is not available, exit the process
                process.exit(1);
            }
        });
    });
}
bootstrap();
// Handling SIGTERM signal
process.on('SIGTERM', () => {
    console.log('SIGTERM is received.');
    if (server) {
        // Close the server gracefully
        server.close();
    }
});
