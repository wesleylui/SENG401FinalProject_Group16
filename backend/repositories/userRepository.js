const db = require("../config/db");

// createUser for signin functionality
const createUser = (username, password) => {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// findUser for login functionality
const findUser = (username, password) => {
  const sql =
    "SELECT id, username FROM users WHERE username = ? AND password = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.length > 0 ? results[0] : null); // Return user object including id and username
    });
  });
};

// Function to initialize the database
const initializeDatabase = async () => {
  const env = process.env.ENV; // Get the environment variable
  const sql = `
    ${env === "deployment" ? "DROP TABLE IF EXISTS users;" : ""}
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    INSERT IGNORE INTO users (username, password) VALUES ('admin', 'pw');
  `;

  try {
    await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  } catch (error) {
    console.error("Error initializing users table:", error);
    throw error;
  }
};

module.exports = { createUser, findUser, initializeDatabase };
