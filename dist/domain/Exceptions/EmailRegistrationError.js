"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRegistrationError = void 0;
const BaseError_1 = require("./BaseError");
class EmailRegistrationError extends BaseError_1.BaseError {
    constructor() {
        super("email is already registered");
        Object.setPrototypeOf(this, EmailRegistrationError.prototype);
    }
}
exports.EmailRegistrationError = EmailRegistrationError;
