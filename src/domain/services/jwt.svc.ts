import { IAccount } from '@domain/models/account'
import jwt from 'jsonwebtoken'

export class JwtService {

    static generateToken = (params: IAccount): string => {
        return jwt.sign({data: "hola"}, 'secretkey') 
    }

    static verifyToken = (token: string) => {
        jwt.verify(token, 'secretkey', (error, authData) => {
            return typeof authData === "string"
        })
    } 
}