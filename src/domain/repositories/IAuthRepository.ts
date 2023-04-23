import { AuthUser } from "../models/User"

export interface IAuthRepository {
    findById(params: Pick<AuthUser, "customer_id">): Promise<AuthUser>
    findByEmail(params: Pick<AuthUser, "email">): Promise<AuthUser>
    save(params: AuthUser): Promise<Pick<AuthUser, 'customer_id'>>
}