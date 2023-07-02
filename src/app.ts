import config from "./infrastructure/config/config";
import express, { Application } from "express";
import Server from './server'
import { init } from "./infrastructure/database/mongo";


const main = async () => {
    const app: Application = express()

    const server = new Server(app)

    await init(config.MONGO_URLCONNECTION as string)

    server.listen()
}

main().catch(console.log)