"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            //pool.query('DESCRIBE games');
            const games = yield database_1.default.query('SELECT* FROM games');
            resp.json(games);
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT* FROM games WHERE id=?', [id]);
            if (games.length > 0) {
                return resp.json(games[0]);
            }
            resp.status(404).json({ text: 'The game does not exist' });
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games set?', [req.body]);
            console.log(req.body);
            resp.json({ message: 'Game Saved' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            resp.json({ message: 'The game was deleted' });
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE games set ? WHERE id= ?', [req.body, id]);
            resp.json({ message: 'The game was updated ' });
        });
    }
}
exports.gamesController = new GamesController();
