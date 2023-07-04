import dotenv from 'dotenv'

let path = `${__dirname}/../../../.env.${process.env.NODE_ENV}`

dotenv.config({path: path})

const config = {
    MONGO_URLCONNECTION: process.env.MONGO_URLCONNECTION,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,

    AWS_ACCESSKEYID: process.env.AWS_ACCESSKEYID,
    AWS_SECRETACCESSKEY: process.env.AWS_SECRETACCESSKEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,

    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,

    PORT: process.env.PORT
}

export default config