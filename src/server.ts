import { Application, json, urlencoded } from "express";
import { Router } from "./infrastructure/routes/Router";
import cors from 'cors'
import { ErrorHandler } from "./application/middlewares/ErrorHandler";

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

    } 


    public init() {
        this.config()

        // set routes
        const router = new Router(this.app)
        router.init()

        // error handler middleware
        this.app.use(ErrorHandler)

        this.app.listen(process.env.PORT || 4504, () => {
            console.log(`Server is running ${process.env.PORT}`)
        })
    }
} 