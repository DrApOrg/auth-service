"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPhone = exports.VerifyPhoneCode = exports.SendPhoneCode = void 0;
const SendPhoneCode = (phone) => {
    return "12345";
};
exports.SendPhoneCode = SendPhoneCode;
const VerifyPhoneCode = (code) => {
    return "12345" === code;
};
exports.VerifyPhoneCode = VerifyPhoneCode;
const VerifyPhone = (phone) => {
    return phone.length === 9;
};
exports.VerifyPhone = VerifyPhone;
