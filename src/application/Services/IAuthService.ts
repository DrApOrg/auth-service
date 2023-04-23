import { AuthUser } from "../../domain/models/User"

export interface IAuthService {
    loginUser(params: AuthUser): Promise<AuthUser>
    registerUser(params: AuthUser): Promise<Pick<AuthUser, 'customer_id'>>
    profileUser(params: Pick<AuthUser, "customer_id">): Promise<AuthUser>
}