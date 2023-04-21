import { AuthUser } from "../../../domain/models/User";
import { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import { IAuthService } from "../IAuthService";

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
            console.log(err)
            throw Error('Error login repository')
        }
    }

    async registerUser(params: AuthUser): Promise<AuthUser> {
        throw new Error("Method not implemented.");
    }

    async profileUser(params: Pick<AuthUser, "id">): Promise<AuthUser> {
        throw new Error("Method not implemented.");
    }

}