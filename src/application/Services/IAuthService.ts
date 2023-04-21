import { AuthUser } from "../../domain/models/User"

export interface IAuthService {
    loginUser(params: AuthUser): Promise<AuthUser>
    registerUser(params: AuthUser): Promise<AuthUser>
    profileUser(params: Pick<AuthUser, 'id'>): Promise<AuthUser>
}