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
  const sql = "SELECT id, username FROM users WHERE username = ? AND password = ?";
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
const initializeDatabase = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
    
    CREATE TABLE IF NOT EXISTS stories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      genre VARCHAR(177),
      story TEXT NOT NULL, -- Changed from VARCHAR(1027) to TEXT for flexibility
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
    // THIS INIT OF STORIES TABLE IS DIFFERENT TO LUKE's SCREENSHOT FROM DISCORD

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { createUser, findUser, initializeDatabase };
