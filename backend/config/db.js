const mysql = require("mysql2");
require("dotenv").config(); // load .env variables

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
