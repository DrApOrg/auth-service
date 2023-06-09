import type { Application, Response, Request } from "express";
import { AccountController } from "../controllers/account.ctrl";
import { AccountService } from "../../../domain/services/account.svc";
import { AccountRepository } from "../../repositories/account.repo";

export const AccountRoutes = (app: Application) => {
    let accountRepo = new AccountRepository() 
    let accountService = new AccountService(accountRepo)
    let accountController = new AccountController(accountService)

    app.post('/v1/api/auth/pre-register', accountController.sendPhoneCode)
    app.post('/v1/api/auth/register', accountController.registerAccount)
    app.post('/v1/api/auth/login', accountController.loginAccount)
    app.get('/v1/api/auth/test', (req: Request, res: Response) => {
        res.send('hola mundo desde usuarios')
    })

    return app
}