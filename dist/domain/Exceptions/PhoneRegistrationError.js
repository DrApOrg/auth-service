"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneRegistrationError = void 0;
const BaseError_1 = require("./BaseError");
class PhoneRegistrationError extends BaseError_1.BaseError {
    constructor() {
        super("phone is already registered");
        Object.setPrototypeOf(this, PhoneRegistrationError.prototype);
    }
}
exports.PhoneRegistrationError = PhoneRegistrationError;
