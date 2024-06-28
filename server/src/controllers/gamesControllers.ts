import {Request, Response} from 'express';
import pool from '../database';

class GamesController{
    public async list(req: Request, resp: Response){
        //pool.query('DESCRIBE games');
        const games = await pool.query('SELECT* FROM games');
        resp.json(games);
        
    }

    public async getOne(req:Request, resp:Response): Promise <any>{
        const {id}=req.params;
        const games= await pool.query('SELECT* FROM games WHERE id=?',[id])
        if(games.length > 0){
            return resp.json(games[0]);
        }
        resp.status(404).json({text: 'The game does not exist'});
    }

    public async create (req:Request, resp:Response):Promise<void>{
        await pool.query('INSERT INTO games set?',[req.body]);
        console.log(req.body);
        resp.json({message: 'Game Saved'});
    }

    public async delete (req: Request, resp: Response):Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        resp.json({message: 'The game was deleted'});
    }

    public async update(req:Request, resp: Response):Promise<void>{
        const {id}=req.params;
        await pool.query('UPDATE games set ? WHERE id= ?',[req.body,id]);
        resp.json({message : 'The game was updated '});
    }

}
export const gamesController=new GamesController();