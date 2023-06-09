"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountSchema = void 0;
const mongoose_1 = require("mongoose");
const account_1 = require("@domain/models/account");
exports.accountSchema = new mongoose_1.Schema({
    accountType: {
        type: String,
        enum: account_1.AccountType,
        required: true
    },
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    name: { type: String, require: true },
    dni: { type: Number, require: true },
    phone: { type: Number, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
}, {
    timeStamp: true,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
