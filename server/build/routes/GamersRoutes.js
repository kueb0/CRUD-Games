"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamersControllers_1 = require("../controllers/gamersControllers");
class GamersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', gamersControllers_1.gamersController.list);
        this.router.get('/:id', gamersControllers_1.gamersController.getOne);
        this.router.post('/', gamersControllers_1.gamersController.create);
        this.router.delete('/ : id', gamersControllers_1.gamersController.delete);
        this.router.put('/:id', gamersControllers_1.gamersController.update);
    }
}
const gamersRoutes = new GamersRoutes();
exports.default = gamersRoutes.router;
