// db.js file
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
};

const connectToDB = async () => {
    try {
        const connection = await mysql.createConnection(dbconfig);
        console.log('Connected to Aiven MySQL!');
        return connection;
    } catch (error) {
        console.error('Error connecting to Aiven MySQL:', error);
        throw error;
    }
};

module.exports = connectToDB;
