const mysql = require("mysql2");
require("dotenv").config(); // load .env variables

// Create a MySQL connection (locally)
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: process.env.DB_PASSWORD, // no pw. may have to change your sql pw (ask wesley)
//   database: "story_gen", // db is called story_gen
// });

console.log("Connecting to:", process.env.DATABASE_URL);

// create MYSQL connection using Railway database URL
const db = mysql.createConnection(process.env.DATABASE_URL);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed (db.js):", err);
    return;
  }
  console.log("✅ Connected to MySQL database! (db.js)");
});

module.exports = db;
