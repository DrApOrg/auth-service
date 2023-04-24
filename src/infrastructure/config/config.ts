import dotenv from 'dotenv'

let path = `${__dirname}/../../../.env.${process.env.NODE_ENV}`


dotenv.config({path: path})

const config = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USERNAME : process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
    PORT: process.env.PORT
}

export default config