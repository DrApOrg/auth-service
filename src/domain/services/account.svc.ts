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
    sendPhoneCode: (phone: string) => Promise<string>
    verifyCodePhone: (code: string) => boolean
    loginAccount: (account: IAccount) => Promise<IAccount>
    createAccount: (param: IAccount) => Promise<IAccount>
    updateAccount: (param: IAccount) => Promise<IAccount>
    profile: (phone: string) => Promise<IAccount>
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

    sendPhoneCode = async (phone: string): Promise<string> => {
        if(UseCase.VerifyPhone(phone)) {
            throw new InvalidPhone
        }
        if(await this.accRepo.findByPhone(phone)) {
            throw new PhoneRegistrationError
        }
        return UseCase.SendPhoneCode(phone)
    }

    // TODO: implement verify code phone
    verifyCodePhone = (code: string): boolean => {
        return UseCase.VerifyPhoneCode(code)
    }

    createAccount = async (param: IAccount): Promise<IAccount> => {
        if(await this.accRepo.findByPhone(param.phone as string)) {
            throw new PhoneRegistrationError
        }

        const createdAccount = await this.accRepo.save(param)

        return createdAccount
    }

    updateAccount = async (param: IAccount): Promise<IAccount> => {
        if(await this.accRepo.findByEmail(param.email)) {
            throw new EmailRegistrationError
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        param.password = await bcrypt.hash(param.password, salt)

        const account = await this.accRepo.update(param.id as string, param)

        if(!account) {
            throw new BaseError("error updating user") 
        }
        return account
    }

    profile = async  (phone: string): Promise<IAccount> => { 
        const account = await this.accRepo.findByPhone(phone)
        if(!account) {
            throw new BaseError("error getting user")
        }
        return account
    }

}