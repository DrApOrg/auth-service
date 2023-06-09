import { ResponsePayload } from "@domain/Payload/response.payload"
import { IAccount } from "@domain/models/account"
import { IAccountService } from "@domain/services/account.svc"
import { JwtService } from "../../../domain/services/jwt.svc"
import type { NextFunction, Request, Response } from "express"

export class AccountController{

    constructor(
        private service: IAccountService
    ){
    }

    resSendPhoneCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone } = req.body
            const phoneCode = this.service.sendPhoneCode(phone)
            const payload: ResponsePayload<{code: string}> = {
                message: "verification phone code",
                status: 200,
                data: {
                    code: phoneCode
                }
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }

    sendPhoneCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone } = req.body

            const phoneCode = await this.service.sendPhoneCode(phone)
            const account = await this.service.createAccount(phone)

            const payload: ResponsePayload<{code: string, user: IAccount}> = {
                message: "phone registered successfully",
                status: 200,
                data: {
                    code: phoneCode,
                    user: account
                }
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }

    registerAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const account = req.body
            const createdAccount = await this.service.updateAccount(account)
            const payload: ResponsePayload<IAccount> = {
                message: "user registered successfully",
                status: 200,
                data: createdAccount
                
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    } 

    loginAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const account = req.body
            const createdAccount = await this.service.loginAccount(account)
            const token = JwtService.generateToken(createdAccount)
            console.log(token)
            const payload: ResponsePayload<string> = {
                message: "successfully",
                status: 200,
                data: token
                
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }
}