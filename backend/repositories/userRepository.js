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

  const dropStoriesTableSQL = `
    DROP TABLE IF EXISTS stories;
  `;

  const dropUsersTableSQL = `
    DROP TABLE IF EXISTS users;
  `;

  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;

  const insertAdminSQL = `
    INSERT IGNORE INTO users (username, password) VALUES ('admin', 'pw');
  `;

  try {
    if (env === "deployment") {
      // Drop the stories table first to remove the foreign key constraint
      await new Promise((resolve, reject) => {
        db.query(dropStoriesTableSQL, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      // Then drop the users table
      await new Promise((resolve, reject) => {
        db.query(dropUsersTableSQL, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    }

    // Create the users table
    await new Promise((resolve, reject) => {
      db.query(createUsersTableSQL, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Insert the admin user
    await new Promise((resolve, reject) => {
      db.query(insertAdminSQL, (err, result) => {
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
