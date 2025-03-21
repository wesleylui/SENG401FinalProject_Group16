const mysql = require("mysql2");
require("dotenv").config(); // load .env variables

let db;

if (process.env.ENV === "local") {
  console.log("🔧 Connecting to MySQL locally...");
  db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  });
} else {
  console.log("🌐 Connecting to MySQL on Railway...");
  db = mysql.createConnection(process.env.DATABASE_URL);
}

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed (db.js):", err);
    return;
  }
  console.log(`✅ Connected to MySQL database! (ENV: ${process.env.ENV})`);
});

module.exports = db;
