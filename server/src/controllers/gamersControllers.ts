import {Request, Response} from 'express';
import pool from '../database';

class GamersController{
    public async list(req: Request, resp: Response){
        //pool.query('DESCRIBE gamer');
        const gamers = await pool.query('SELECT* FROM gamers');
        resp.json(gamers);
        
    }

    public async getOne(req:Request, resp:Response): Promise <any>{
        const {id}=req.params;
        const gamers= await pool.query('SELECT* FROM gamers WHERE id=?',[id])
        if(gamers.length > 0){
            return resp.json(gamers[0]);
        }
        resp.status(404).json({text: 'The gamer does not exist'});
    }

    public async create (req:Request, resp:Response):Promise<void>{
        await pool.query('INSERT INTO gamers set?',[req.body]);
        console.log(req.body);
        resp.json({message: 'Gamer Saved'});
    }

    public async delete (req: Request, resp: Response):Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM gamers WHERE id = ?', [id]);
        resp.json({message: 'The gamer was deleted'});
    }

    public async update(req:Request, resp: Response):Promise<void>{
        const {id}=req.params;
        await pool.query('UPDATE gamers set ? WHERE id= ?',[req.body,id]);
        resp.json({message : 'The gamer was updated '});
    }

}
export const gamersController=new GamersController();