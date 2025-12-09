// db.js file
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.createConnection();
        console.log('Successfully connected to Aiven MySQL database with SSL!');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testConnection();

module.exports = pool;
