"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPhone = void 0;
const BaseError_1 = require("./BaseError");
class InvalidPhone extends BaseError_1.BaseError {
    constructor() {
        super("invalid phone");
        Object.setPrototypeOf(this, InvalidPhone.prototype);
    }
}
exports.InvalidPhone = InvalidPhone;
