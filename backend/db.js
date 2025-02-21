const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // no pw. may have to change your sql pw (ask wesley)
  database: "story_gen", // db is called story_gen
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = db;
