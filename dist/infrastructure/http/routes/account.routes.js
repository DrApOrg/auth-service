"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutes = void 0;
const account_ctrl_1 = require("../controllers/account.ctrl");
const account_svc_1 = require("@domain/services/account.svc");
const account_repo_1 = require("@infrastructure/repositories/account.repo");
const AccountRoutes = (app) => {
    let accountRepo = new account_repo_1.AccountRepository();
    let accountService = new account_svc_1.AccountService(accountRepo);
    let accountController = new account_ctrl_1.AccountController(accountService);
    app.get('/v1/api/auth/pre-register', accountController.sendPhoneCode);
    app.get('/v1/api/auth/register', accountController.registerAccount);
    return app;
};
exports.AccountRoutes = AccountRoutes;
