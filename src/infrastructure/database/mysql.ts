import {createPool, Pool} from 'mysql'
import config from '../config/config'; 

export interface SqlAdapter {
  db: Pool;
}

export class MySqlAdapter implements SqlAdapter {
    private database: Pool;

    constructor (){
        this.database = createPool({
            host: config.DATABASE_HOST,
            user: config.DATABASE_USERNAME,
            password: config.DATABASE_PASSWORD,
            database: config.DATABASE_NAME,
            port: 3307
        });
    }

    get db() {
        return this.database
    }
}




