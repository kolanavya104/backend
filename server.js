const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_new_password',
  database: process.env.DB_NAME || 'testdb',
  port: process.env.DB_PORT || 3306
});



connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name } = req.body;

  const query = 'INSERT INTO names (name) VALUES (?)';
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting name');
    } else {
      res.status(200).send('Name submitted successfully!');
    }
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
