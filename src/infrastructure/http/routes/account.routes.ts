import type { Application, Response, Request } from "express";
import { AccountController } from "../controllers/account.ctrl";
import { AccountService } from "../../services/account.svc";
import { AccountRepository } from "../../repositories/account.repo";
import { S3Repository } from "../../repositories/s3.repo";
import { storageClient } from "../../aws/s3";

export const AccountRoutes = (app: Application) => {
    let accountRepo = new AccountRepository() 
    let s3Repo = new S3Repository(storageClient)

    let accountService = new AccountService(accountRepo, s3Repo)

    let accountController = new AccountController(accountService)

    app.post('/v1/api/auth/sendsms', accountController.sendPhoneCode)
    app.post('/v1/api/auth/pre-register', accountController.preRegisterAccount)
    app.post('/v1/api/auth/register', accountController.registerAccount)
    app.post('/v1/api/auth/resendsms', accountController.reSendPhoneCode)
    app.post('/v1/api/auth/login', accountController.loginAccount)
    app.post('/v1/api/auth/upload', accountController.uploadImage)
    app.get('/v1/api/auth/test', (req: Request, res: Response) => {
        res.send('hola mundo desde usuarios')
    })

    return app
}