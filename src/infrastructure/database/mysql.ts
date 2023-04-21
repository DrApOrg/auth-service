import {createPool, Pool} from 'mysql'

const DATABASE_URL_TEST ='mysql://root:password@localhost:3307/draporg'

export interface SqlAdapter {
  db: Pool;
}

export class MySqlAdapter implements SqlAdapter {
    private database: Pool;

    constructor (){
        this.database = createPool(DATABASE_URL_TEST);
    }

    get db() {
        return this.database
    }
}




