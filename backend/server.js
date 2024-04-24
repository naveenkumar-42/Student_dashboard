const express = require('express');
const mysql = require('mysql2'); // Updated import for mysql2
const cors = require('cors');

const app = express();
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    port: 3307, // Updated port number
    user: 'root',
    password: '', // Empty string for no password
    database: 'student_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise(); // Create a promise-based pool

app.get('/', (req, res) => {
    return res.json('vanakam pa na tha naveenu');
});

app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    promisePool.query(sql)
        .then(([rows, fields]) => {
            return res.json(rows);
        })
        .catch((err) => {
            console.error('Error executing query:', err);
            return res.json(err); // Send a user-friendly error message
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
