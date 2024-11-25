const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const { exec } = require("child_process");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

app.all("*.php", (req, res) => {
  const phpPath = `${__dirname}${req.path}`;
  const phpCommand = `php ${phpPath}`;

  exec(phpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PHP command: ${phpCommand}`);
      console.error(`STDERR: ${stderr}`);
      console.error(`Error: ${error.message}`);
      res.status(500).send(`PHP Execution Error: ${stderr || error.message}`);
    } else {
      res.send(stdout);
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.send("Welcome to the Caregiver API using MySQL");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
