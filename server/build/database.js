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
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Crear conexión al pool
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'mariadbGames',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'ng_games_db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
});
// Script para crear la tabla si no existe
const createTableQuery = `
CREATE TABLE IF NOT EXISTS games (
    Id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180),
    description VARCHAR(255),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
// Inicialización
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Probar conexión
        const connection = yield pool.getConnection();
        console.log('DB is connected');
        // Ejecutar script para crear tabla
        yield connection.query(createTableQuery);
        console.log('Table `game` is ready or already exists.');
        // Liberar conexión
        connection.release();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Database initialization failed:', error.message);
        }
        else {
            console.error('Unknown error occurred during database initialization');
        }
    }
}))();
exports.default = pool;
