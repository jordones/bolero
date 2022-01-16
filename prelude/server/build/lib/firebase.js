"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_account_1 = __importDefault(require("../service-accounts/firebase-account"));
exports.default = () => {
    const app = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert((0, firebase_account_1.default)())
    });
    return app.firestore();
};
