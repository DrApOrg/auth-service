export interface IAccountPayload extends Omit<IAccount, 'id'>{}
export interface IAccount {
    id?: string;
    image?: string;
    accountType?: AccountType;
    firstName?: string;
    lastName?: string;
    name?: string;
    dni?: string;
    phone?: string;
    email: string;
    password: string;
    birthday?: string;
    createdAt: string;
    updatedAt: string;
} 

export enum AccountType {
    EMPLOYEE = '01',
    CUSTOMER = '02'
}