import { accountDao } from "../../infrastructure/database/account/account.dao";
import { IAccount, IAccountPayload } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/account.repo";

export class AccountRepository implements IAccountRepository {

    async findById(id: string): Promise<IAccount | null> {
        const account = await accountDao.findById<IAccount>(id)
        if(account) {
            return account
        }
        return null
    }

    async findByPhone(phone: string): Promise<IAccount | null> {
        const account = await accountDao.findOne<IAccount>({phone: phone}) 
        if(account) {
            return account
        }
        return null
    }


    async findByEmail(email: string): Promise<IAccount | null> {
        const account = await accountDao.findOne<IAccount>({email: email})
        if(account){
            return account
        }
        return null
    }

    async update(id: string, params: IAccountPayload): Promise<IAccount | null> {
        const account = await accountDao.findByIdAndUpdate(id, params, {new: true})
        if(account){
            return account
        }
        return null
    }

    async save(params: IAccountPayload): Promise<IAccount> {
        return await accountDao.create<IAccount>(params) 
    }

}
