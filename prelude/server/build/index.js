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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const application_1 = __importDefault(require("./application"));
const firebase_1 = __importDefault(require("./lib/firebase"));
dotenv_1.default.config();
const application = (0, application_1.default)();
const firebase = (0, firebase_1.default)();
const port = Number.parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000", 10);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // custom 404 page to avoid html
    application.use((_, res, _2) => res.sendStatus(404));
    const server = application.listen(port, () => {
        const host = server.address();
        const address = host.address;
        const port = host.port;
        console.log(`Template server up and running, listening at http://${address}:${port}`); // eslint-disable-line no-console
    });
});
main();
process.on('uncaughtException', (error) => {
    // logger.error('uncaught exception', formatError(error), () => process.exit(1));
});
process.on('unhandledRejection', (error) => {
    // logger.error('unhandled rejection', formatError(error), () => process.exit(1));
});
