import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crear conexión al pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
(async () => {
    try {
        // Probar conexión
        const connection = await pool.getConnection();
        console.log('DB is connected');

        // Ejecutar script para crear tabla
        await connection.query(createTableQuery);
        console.log('Table `game` is ready or already exists.');

        // Liberar conexión
        connection.release();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Database initialization failed:', error.message);
        } else {
            console.error('Unknown error occurred during database initialization');
        }
        }
})();

export default pool;
