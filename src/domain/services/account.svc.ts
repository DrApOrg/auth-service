import { IAccount } from "@domain/models/account";
import bcrypt from 'bcrypt'
import * as UseCase from "../../application/use-cases/SmsUseCase";
import { 
    BaseError,
    PhoneRegistrationError,
    EmailRegistrationError,
    InvalidPhone,
    AuthenticationError
} from "../../domain/Exceptions";
import { AccountRepository } from "../../infrastructure/repositories/account.repo";

export interface IAccountService {
    sendPhoneCode: (phone: string) => string
    verifyCodePhone: (code: string) => boolean
    loginAccount: (account: IAccount) => Promise<IAccount>
    createAccount: (phone: string) => Promise<IAccount>
    updateAccount: (params: IAccount) => Promise<IAccount>
    profile: (id: string) => Promise<IAccount>
}

export class AccountService implements IAccountService {
    constructor(
        private accRepo: AccountRepository
    ){
    }

    loginAccount = async (params: IAccount): Promise<IAccount> => {
        const account = await this.accRepo.findByEmail(params.email)
        if(account === null) {
            throw new AuthenticationError
        }

        const result = await bcrypt.compare(params.password, account.password as string)
        if(!result) {
            throw new AuthenticationError
        }

        return account
    }

    sendPhoneCode = (phone: string): string=> {
        return UseCase.SendPhoneCode(phone)
    }

    // TODO: implement verify code phone
    verifyCodePhone = (code: string): boolean => {
        return UseCase.VerifyPhoneCode(code)
    }

    createAccount = async (phone: string): Promise<IAccount> => {
        if(UseCase.VerifyPhone(phone)) {
            throw new InvalidPhone
        }

        if(await this.accRepo.findByPhone(phone)) {
            throw new PhoneRegistrationError
        }

        const account: IAccount = {phone: phone} as IAccount

        const createdAccount = await this.accRepo.save(account)

        return createdAccount
    }

    updateAccount = async (params: IAccount): Promise<IAccount> => {
        if(await this.accRepo.findByEmail(params.email)) {
            throw new EmailRegistrationError
        }

        const salt = await bcrypt.genSalt(10)
        params.password = await bcrypt.hash(params.password, salt)

        const account = await this.accRepo.update(params.id as string, params)
        if(!account) {
            throw new BaseError("") 
        }
        return account
    }

    profile = async  (id: string): Promise<IAccount> => { 
        const account = await this.accRepo.findById(id)
        if(!account) {
            throw new BaseError("")
        }
        return account
    }

}