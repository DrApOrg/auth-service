import { Application, json, urlencoded } from "express";
import { Router } from "./infrastructure/http/routes/Router";
import cors from 'cors'
import { ErrorHandler } from "./application/middlewares/ErrorHandler";
import fileupload from 'express-fileupload'

// Server class
export default class Server {
    private app: Application

    constructor(appExpress: Application) {
        this.app = appExpress 
    }

    private config(): void {
        //  url encoded middleware 
        this.app.use(urlencoded({ extended: true }))

        // cors middleware
        this.app.use(cors())

        // json middleware
        this.app.use(json())

        // file uploader middleware
        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))
    } 

    public listen() {
        this.config()

        // set routes
        const router = new Router(this.app)

        router.init()
        this.app.use(ErrorHandler)

        console.log("port", process.env.PORT)
        this.app.listen(process.env.PORT || 4504, () => {
            console.log(`Server is running ${process.env.PORT}`)
        })
    }
} 