require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER || 'finance_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'finance_calculator',
    password: process.env.DB_PASSWORD || 'finance_pass_2024',
    port: process.env.DB_PORT || 5432,
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connected to Database:', result.rows[0]);
    });
});

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// GET History
app.get('/api/history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM calculation_history ORDER BY created_at DESC LIMIT 50');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST History
app.post('/api/history', async (req, res) => {
    const { type, details, result } = req.body;
    try {
        const query = 'INSERT INTO calculation_history (type, details, result) VALUES ($1, $2, $3) RETURNING *';
        const values = [type, JSON.stringify(details), result];
        const dbRes = await pool.query(query, values);
        res.status(201).json(dbRes.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
