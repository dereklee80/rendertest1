// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');
const port = 3000;


const dbConfig = {
    host: "mysql-2f879c75-sicshot-2c3d.l.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_WdWiAYWkKKegwTt47Ja",
    database: "defaultdb",
    port: 14495,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(), // Path to your downloaded CA certificate
    }
};

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Example Route: Get all cards
app.get('/allcards', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.card_test');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - allcards20' });
    }
});

/*
// Example Route: Create a new card
app.post('/addcard', async (req, res) => {
    const { card_name, card_qty } = req.body;
    try {
        await db.query('INSERT INTO card_test (card_name, card_qty) VALUES (?, ?)', [card_name, card_qty]);
        res.status(201).json({ message: 'Card added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - addcard' });
    }
});
*/

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

