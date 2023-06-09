"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let path = `${__dirname}/../../../.env.${process.env.NODE_ENV}`;
dotenv_1.default.config({ path: path });
const config = {
    MONGO_URLCONNECTION: process.env.MONGO_URLCONNECTION,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MSG91_AUTHKEY: process.env.MSG91_AUTHKEY,
    PORT: process.env.PORT
};
exports.default = config;
