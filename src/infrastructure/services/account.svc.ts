import { IAccount } from "../../domain/models/account";
import bcrypt from 'bcrypt'
import { 
    BaseError,
    PhoneRegistrationError,
    EmailRegistrationError,
    InvalidPhone,
    AuthenticationError
} from "../../domain/Exceptions";
import { IAccountService } from "../../domain/services/IAccountService";
import { IFileRepository } from "../../domain/repositories/IFile.srv";
import { IAccountRepository } from "../../domain/repositories/account.repo";
import { clientTwilio, sendCoderTest } from "../../infrastructure/twilio/twilio";

export class AccountService implements IAccountService {
    constructor(
        private accRepo: IAccountRepository,
        private s3Repo: IFileRepository,
    ){
    }

    uploadFile = async (param: any): Promise<string> => {
        return this.s3Repo.uploadFile(param) 
    };

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
        if(!(phone.slice(3).length === 9)) {
            throw new InvalidPhone
        }

        if(await this.accRepo.findByPhone(phone)) {
            throw new PhoneRegistrationError
        }

        // const pin = Math.floor(10000 + Math.random() * 90000).toString()
        // const data = await sendCoderTest(pin, phone)
        // console.log({message_void: data})
        return "12345"
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

    patchAccount = async (param: IAccount): Promise<IAccount> => {
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