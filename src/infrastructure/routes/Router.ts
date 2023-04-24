import { Application, Request, Response } from "express";
import { AuthService } from "../../application/Services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { MySqlAdapter } from "../database/mysql";
import { AuthRepository } from "../../application/repositories/AuthRepository";

export class Router {
    private app: Application

    constructor(app: Application) {
        this.app = app
    }

    init() {
        const sql = new MySqlAdapter()
        const authRepo = new AuthRepository(sql)
        const authService = new AuthService(authRepo)
        const authController = new AuthController(authService)

        this.app.post('/api/v1/login', authController.login)
        this.app.post('/api/v1/register', authController.register)
        this.app.get('/api/v1/test', (req: Request, res: Response) => {
            res.send('hola mundo')
        })
    }
}