const express = require("express");
const cors = require("cors");
const db = require("./db"); // Import MySQL connection

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend requests

// User Signup API
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Signup failed" });
    }
    res.status(201).json({ message: "User created successfully" });
  });
});

// User Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Login failed" });
    }
    if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
