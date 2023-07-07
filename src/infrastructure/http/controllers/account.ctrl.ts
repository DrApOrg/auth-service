import { ResponsePayload } from "../../../domain/Payload/response.payload"
import { IAccount } from "../../../domain/models/account"
import { IAccountService } from "../../../domain/services/IAccountService"
import { JwtService } from "../../services/jwt.svc"
import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from "express"
import { IFileRepository } from "../../../domain/repositories/IFile.srv"

export class AccountController{

    constructor(
        private accService: IAccountService,
    ){
    }

    uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.files) {
                throw Error("not found file")
            }            
            console.log(req.files)
            const imageUrl = await this.accService.uploadFile(req.files.file)
            res.json({
                imageurl: imageUrl,
                imagename: imageUrl.split("/").pop()
            }).status(202)
        } catch (error) {
            next(error)
        }
    }

    reSendPhoneCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone } = req.body
            const phoneCode = await this.accService.sendPhoneCode(phone)
            const account = await this.accService.profile(phone)
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

            const phoneCode = await this.accService.sendPhoneCode(phone)

            const payload: ResponsePayload<{code: string}> = {
                message: "sms successfully",
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
            const { firstName, lastName, name, phone, image, birthday, dni, accountType } = req.body
            const createdAccount = await this.accService.createAccount(
                { firstName , lastName, name, phone, image, birthday, dni, accountType } as IAccount)

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
            const createdAccount = await this.accService.updateAccount({id, email, password} as IAccount)

            const token = JwtService.generateToken(createdAccount)
            const payload: ResponsePayload<{
                token: string,
                user: IAccount
            }> = {
                message: "user registered successfully",
                status: 200,
                data: {
                    token,
                    user: createdAccount
                }
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    } 

    editAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization as string;
            const decoded = await JwtService.verifyToken(token.slice(7));

            const {firstName, lastName, birthday, image} = req.body
            console.log(decoded.userId, lastName, firstName, birthday)
            const updatedAccount = await this.accService.patchAccount({id: decoded.userId, firstName, lastName, birthday, image} as IAccount)
            const payload: ResponsePayload<IAccount> = {
                message: "user updated successfully",
                status: 200,
                data: updatedAccount
            }
            return res.json(payload).status(200)
        } catch (error) {
            next(error)
        }
    }

    loginAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const account = req.body
            const loginAccoun = await this.accService.loginAccount(account)
            const token = JwtService.generateToken(loginAccoun)

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