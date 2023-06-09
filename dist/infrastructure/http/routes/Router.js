"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const account_routes_1 = require("./account.routes");
class Router {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app = (0, account_routes_1.AccountRoutes)(this.app);
        this.app.get('/api/v1/test', (req, res) => {
            res.send('hola mundo');
        });
    }
}
exports.Router = Router;
