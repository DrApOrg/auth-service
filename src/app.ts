import express, { Application } from "express";
import Server from './server'
import { init } from "./infrastructure/database/mongo";
import config from "./infrastructure/config/config";


const main = async () => {
    const app: Application = express()

    const server = new Server(app)

    const data = await init(config.MONGO_URLCONNECTION as string)

    server.listen()
}

main().catch(console.log)