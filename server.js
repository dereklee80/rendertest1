// server.js
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
//const fs = require('fs');
const port = 3000;


const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

/*
ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(), // Path to your downloaded CA certificate
    }
 */

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Example Route: Get all cards
app.get('/allcards26', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.card_test');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - allcards26' });
    }
});


// Example Route: Create a new card
app.get('/addcard', async (req, res) => {
    const { card_name, card_qty } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO card_test (card_name, card_qty) VALUES (?, ?)', [card_name, card_qty]);
        res.status(201).json({ message: 'Card added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - addcard' });
    }
});


//start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

