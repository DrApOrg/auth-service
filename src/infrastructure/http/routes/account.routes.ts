import type { Application, Response, Request } from "express";
import { AccountController } from "../controllers/account.ctrl";
import { AccountService } from "../../services/account.svc";
import { AccountRepository } from "../../repositories/account.repo";
import { S3Service } from "../../../infrastructure/services/s3.svc";
import { storageClient } from "../../../infrastructure/aws/s3";

export const AccountRoutes = (app: Application) => {
    let accountRepo = new AccountRepository() 
    let accountService = new AccountService(accountRepo)
    let s3Service = new S3Service(storageClient)

    let accountController = new AccountController(accountService, s3Service)

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