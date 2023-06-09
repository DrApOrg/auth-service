"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AccountService = void 0;
const UseCase = __importStar(require("@application/use-cases"));
const Exceptions_1 = require("@domain/Exceptions");
class AccountService {
    constructor(accRepo) {
        this.accRepo = accRepo;
        // TODO: implement verify code phone
        this.verifyCodePhone = (code) => {
            return UseCase.VerifyPhoneCode(code);
        };
        this.createAccount = (phone) => __awaiter(this, void 0, void 0, function* () {
            if (UseCase.VerifyPhone(phone)) {
                throw Exceptions_1.InvalidPhone;
            }
            const code = yield UseCase.SendPhoneCode(phone);
            if (yield this.accRepo.findByPhone(phone)) {
                throw Exceptions_1.PhoneRegistrationError;
            }
            const account = { phone: phone };
            yield this.accRepo.save(account);
            return code;
        });
        this.updateAccount = (params) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.accRepo.findByEmail(params.email)) {
                throw Exceptions_1.EmailRegistrationError;
            }
            const account = yield this.accRepo.update(params.id, params);
            if (!account) {
                throw Exceptions_1.BaseError;
            }
            return account;
        });
        this.profile = (id) => __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accRepo.findById(id);
            if (!account) {
                throw Exceptions_1.BaseError;
            }
            return account;
        });
    }
}
exports.AccountService = AccountService;
