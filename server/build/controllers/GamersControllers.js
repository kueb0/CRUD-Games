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
exports.gamersController = void 0;
const database_1 = __importDefault(require("../database"));
class GamersController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            //pool.query('DESCRIBE gamer');
            const gamers = yield database_1.default.query('SELECT* FROM gamers');
            resp.json(gamers);
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const gamers = yield database_1.default.query('SELECT* FROM gamers WHERE id=?', [id]);
            if (gamers.length > 0) {
                return resp.json(gamers[0]);
            }
            resp.status(404).json({ text: 'The gamer does not exist' });
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO gamers set?', [req.body]);
            console.log(req.body);
            resp.json({ message: 'Gamer Saved' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM gamers WHERE id = ?', [id]);
            resp.json({ message: 'The gamer was deleted' });
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE gamers set ? WHERE id= ?', [req.body, id]);
            resp.json({ message: 'The gamer was updated ' });
        });
    }
}
exports.gamersController = new GamersController();
