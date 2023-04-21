import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../application/Services/IAuthService";

export class AuthController {
    private service: IAuthService

    constructor(service: IAuthService){
        this.service = service
    }

     login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authuser = req.body
            const result = await this.service.loginUser(authuser)
            res.status(201).send(result);
        } catch (error) {
            next(error)
        }
    }
}  