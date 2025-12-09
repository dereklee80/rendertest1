// db.js file
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection  = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to Aiven MySQL database as id ' + connection.threadId);
});

module.exports = connection;
