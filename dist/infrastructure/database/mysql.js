"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlAdapter = void 0;
const mysql_1 = require("mysql");
const config_1 = __importDefault(require("../config/config"));
class MySqlAdapter {
    constructor() {
        this.database = (0, mysql_1.createPool)({
            host: config_1.default.DATABASE_HOST,
            user: config_1.default.DATABASE_USERNAME,
            password: config_1.default.DATABASE_PASSWORD,
            database: config_1.default.DATABASE_NAME,
            port: 3307
        });
    }
    get db() {
        return this.database;
    }
}
exports.MySqlAdapter = MySqlAdapter;
