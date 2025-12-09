// server.js
const express = require('express');
const db = require('./db.js'); // Your database connection
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies

// Example Route: Get all cards
app.get('/allcards', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM defaultdb.card_test');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - allcards13' });
    }
});

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
