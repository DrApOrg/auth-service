"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const account_dao_1 = require("@infrastructure/database/account/account.dao");
class AccountRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_dao_1.accountDao.findById(id);
            if (account) {
                return account;
            }
            return null;
        });
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_dao_1.accountDao.findOne({ phone: phone });
            if (account) {
                return account;
            }
            return null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_dao_1.accountDao.findOne({ email: email });
            if (account) {
                return account;
            }
            return null;
        });
    }
    update(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_dao_1.accountDao.findByIdAndUpdate(id, params, { new: true });
            if (account) {
                return account;
            }
            return null;
        });
    }
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield account_dao_1.accountDao.create(params);
        });
    }
}
exports.AccountRepository = AccountRepository;
