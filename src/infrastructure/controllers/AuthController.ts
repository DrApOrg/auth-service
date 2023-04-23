import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../application/Services/IAuthService";

export class AuthController {
    private service: IAuthService

    constructor(service: IAuthService){
        this.service = service
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authUser = req.body
            const result = await this.service.loginUser(authUser)
            res.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authUser = req.body
            const result = await this.service.registerUser(authUser)
            res.status(201).send({
                customer_id: result.customer_id
            });
        } catch (error) {
            next(error)
        } 
    } 

}  