"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
exports.default = () => {
    const application = (0, express_1.default)();
    application.use(express_1.default.json());
    application.use((0, compression_1.default)());
    const corsOptions = {
        credentials: true,
        origin: true
    };
    application.use((0, cors_1.default)(corsOptions));
    return application;
};
