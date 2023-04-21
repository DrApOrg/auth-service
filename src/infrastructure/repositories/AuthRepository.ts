import { Pool } from "mysql";
import { AuthUser } from "../../domain/models/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { SqlAdapter } from "../database/mysql";

export class AuthRepository implements IAuthRepository {
    private SqlAdapter: SqlAdapter

    constructor(db: SqlAdapter ){
        this.SqlAdapter = db
    }

    findById = async (params: Pick<AuthUser, "id">): Promise<AuthUser>  => {
        return new Promise((resolve, reject) => { 
            this.SqlAdapter.db.query("SELECT * FROM customers WHERE id_customer = ?", [params.id],
                (err, result) => {
                    if(err) {
                    return reject(err)
                    }
                    resolve(result)
                }
            )
        })
    }

    findByEmail = async (params: Pick<AuthUser, "email">): Promise<AuthUser> => {
        return new Promise((resolve, reject) => {
            this.SqlAdapter.db.query(
                'SELECT * FROM customers WHERE email=?', [params.email],
                (err, result) => {
                    if(err) {
                    return reject(err)
                    }
                    resolve(result)
                }
            )
        })
    }

    save = async(params: AuthUser): Promise<Pick<AuthUser, "id">>  => {
        return new Promise((resolve, reject) => {
            this.SqlAdapter.db.query(
                'INSERT INTO customers (uuid, name, email, addres, payment_method) VALUES (?,?,?,?)', [],
                (err, res) => {
                    err ? reject(err)
                    : resolve(params)
                }
            )
        })
    }


}