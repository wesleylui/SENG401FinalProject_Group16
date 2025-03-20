const mysql = require("mysql");
require("dotenv").config(); // Load .env variables

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1); // Ensure app stops if DB isn't available
  } else {
    console.log("✅ Database connected");
  }
});

module.exports = connection;
