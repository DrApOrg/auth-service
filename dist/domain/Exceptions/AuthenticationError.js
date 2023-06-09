"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const BaseError_1 = require("./BaseError");
class AuthenticationError extends BaseError_1.BaseError {
    constructor() {
        super("incorrect password or email ");
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
exports.AuthenticationError = AuthenticationError;
