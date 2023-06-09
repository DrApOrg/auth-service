import { IAccount, IAccountPayload } from "../models/account"

export interface IAccountRepository {
    findById(id: string): Promise<IAccount | null>
    findByEmail(email: string): Promise<IAccount | null>
    findByPhone(phone: string): Promise<IAccount | null>
    update(id: string, params: IAccountPayload): Promise<IAccount | null>
    save(params: IAccountPayload): Promise<IAccount>
}