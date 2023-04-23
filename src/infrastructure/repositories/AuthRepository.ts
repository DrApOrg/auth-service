import { Pool } from "mysql";
import { AuthUser } from "../../domain/models/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { SqlAdapter } from "../database/mysql";

export class AuthRepository implements IAuthRepository {
    private SqlAdapter: SqlAdapter

    constructor(db: SqlAdapter ){
        this.SqlAdapter = db
    }

    findById = async (params: Pick<AuthUser, "customer_id">): Promise<AuthUser>  => {
        return new Promise((resolve, reject) => { 
            this.SqlAdapter.db.query("SELECT * FROM customers WHERE id_customer = ?", [params.customer_id],
                (err, result) => {
                    if(err) {
                    return reject(err)
                    }
                    resolve(result[0])
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
                    resolve(result[0])
                }
            )
        })
    }

    save = async(params: AuthUser): Promise<Pick<AuthUser, "customer_id">>  => {
        return new Promise((resolve, reject) => {
            this.SqlAdapter.db.query(
                'INSERT INTO customers (customer_id, first_name, last_name, email, dni, password, created_at, updated_at) VALUES (?,?,?,?,?,?, current_timestamp(), current_timestamp())', 
                [params.customer_id, params.first_name, params.last_name, params.email, params.dni, params.password],
                (err, res) => {
                    err ? reject(err)
                    : resolve(params)
                }
            )
        })
    }


}