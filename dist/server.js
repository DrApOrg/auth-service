"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Router_1 = require("./infrastructure/http/routes/Router");
const cors_1 = __importDefault(require("cors"));
const ErrorHandler_1 = require("./application/middlewares/ErrorHandler");
// Server class
class Server {
    constructor(appExpress) {
        this.app = appExpress;
    }
    config() {
        //  url encoded middleware 
        this.app.use((0, express_1.urlencoded)({ extended: true }));
        // cors middleware
        this.app.use((0, cors_1.default)());
        // json middleware
        this.app.use((0, express_1.json)());
    }
    listen() {
        this.config();
        // set routes
        const router = new Router_1.Router(this.app);
        router.init();
        this.app.use(ErrorHandler_1.ErrorHandler);
        this.app.listen(process.env.PORT || 4504, () => {
            console.log(`Server is running ${process.env.PORT}`);
        });
    }
}
exports.default = Server;
