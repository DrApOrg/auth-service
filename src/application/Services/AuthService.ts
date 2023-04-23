import { AuthUser } from "../../domain/models/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IAuthService } from "./IAuthService";
import {v4 as uuid} from 'uuid';

// Custome Errors
import { EmailRegistrationError, BaseError } from "../../domain/Exceptions";

export class AuthService implements IAuthService {

    private repository: IAuthRepository

    constructor(repository: IAuthRepository){
        this.repository = repository
    }

    async loginUser(params: AuthUser): Promise<AuthUser> {
        try {
            const data = await this.repository.findByEmail(params)
            return data
        } catch (err) {
            throw Error('Error login repository')
        }
    }

    async registerUser(params: AuthUser): Promise<Pick<AuthUser, 'customer_id'>> {
        const tempUser = await this.repository.findByEmail(params)
        if(tempUser) {
            throw new EmailRegistrationError
        }
        params.customer_id = uuid() 
        const data = await this.repository.save(params)
        return data
    }

    async profileUser(params: Pick<AuthUser, "customer_id">): Promise<AuthUser> {
        throw new Error("Method not implemented.");
    }
}