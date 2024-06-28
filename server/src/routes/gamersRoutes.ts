import { Router } from "express";
import {gamersController} from '../controllers/gamersControllers';

class GamersRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config():void {
        this.router.get('/', gamersController.list);
        this.router.get('/:id',gamersController.getOne);
        this.router.post('/',gamersController.create);
        this.router.delete('/ : id', gamersController.delete);
        this.router.put('/:id', gamersController.update);
    }
}

const gamersRoutes=new GamersRoutes();
export default gamersRoutes.router;