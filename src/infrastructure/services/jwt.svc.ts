import { IAccount } from '../../domain/models/account'
import jwt from 'jsonwebtoken'

export class JwtService {

    static generateToken = (params: IAccount): string => {
        return jwt.sign({userId: params.id}, process.env.JWT_SECRETKEY as string) 
    }

    static verifyToken = async (token: string) => {
        const data = await jwt.verify(token, process.env.JWT_SECRETKEY as string)
        return data as {userId: string}
    } 
}