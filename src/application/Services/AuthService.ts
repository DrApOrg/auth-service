import { AuthUser } from "../../domain/models/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IAuthService } from "./IAuthService";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt'

// Custome Errors
import { EmailRegistrationError, AuthenticationError } from "../../domain/Exceptions";

export class AuthService implements IAuthService {

    private repository: IAuthRepository

    constructor(repository: IAuthRepository){
        this.repository = repository
    }

    async loginUser(params: AuthUser): Promise<AuthUser> {
        const data = await this.repository.findByEmail(params)
        if(data === undefined) {
            throw new AuthenticationError
        }
        const passIsvalid = await bcrypt.compare(params.password as string, data.password as string)
        if (!passIsvalid){
            throw new AuthenticationError
        }

        return data
    }

    async registerUser(params: AuthUser): Promise<Pick<AuthUser, 'customer_id'>> {
        const tempUser = await this.repository.findByEmail(params)
        if(tempUser) {
            throw new EmailRegistrationError
        }
        params.customer_id = uuid() 

        const salt = await bcrypt.genSalt(10);
        params.password = await bcrypt.hash(params.password as string, salt)

        const data = await this.repository.save(params)
        return data
    }

    async profileUser(params: Pick<AuthUser, "customer_id">): Promise<AuthUser> {
        throw new Error("Method not implemented.");
    }
}