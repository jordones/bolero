"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_account_1 = __importDefault(require("./firebase-account"));
describe('firebase-account', () => {
    it('Returns an object when executed', () => {
        const account = (0, firebase_account_1.default)();
        expect(account).toMatchObject({
            projectId: undefined,
            privateKey: undefined,
            clientEmail: undefined
        });
    });
});
