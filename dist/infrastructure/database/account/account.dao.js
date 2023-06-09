"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDao = void 0;
const mongoose_1 = require("mongoose");
const account_schema_1 = require("./account.schema");
exports.accountDao = (0, mongoose_1.model)('Account', account_schema_1.accountSchema);
