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

    reSendPhoneCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone } = req.body
            const phoneCode = await this.service.sendPhoneCode(phone)
            const account = await this.service.profile(phone)
            const payload: ResponsePayload<{code: string, user: IAccount}> = {
                message: "verification phone code",
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

    sendPhoneCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone } = req.body

            const phoneCode = await this.service.sendPhoneCode(phone)

            const payload: ResponsePayload<{code: string}> = {
                message: "phone registered successfully",
                status: 200,
                data: {
                    code: phoneCode,
                }
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }

    preRegisterAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { firstName, lastName, name, phone, birthday, dni, accountType } = req.body
            const createdAccount = await this.service.createAccount(
                { firstName , lastName, name, phone, birthday, dni, accountType } as IAccount)

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

    registerAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id, email, password} = req.body
            const createdAccount = await this.service.updateAccount({id, email, password} as IAccount)
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
            const loginAccoun = await this.service.loginAccount(account)
            const token = JwtService.generateToken(loginAccoun)
            console.log(token)
            const payload: ResponsePayload<{token: string, user: IAccount}> = {
                message: "successfully",
                status: 200,
                data: {
                    token,
                    user: loginAccoun
                }
                
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }
}