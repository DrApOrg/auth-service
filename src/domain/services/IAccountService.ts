import { IAccount } from "@domain/models/account"

export interface IAccountService {
    sendPhoneCode: (phone: string) => Promise<string>
    loginAccount: (account: IAccount) => Promise<IAccount>
    createAccount: (param: IAccount) => Promise<IAccount>
    updateAccount: (param: IAccount) => Promise<IAccount>
    profile: (phone: string) => Promise<IAccount>
}