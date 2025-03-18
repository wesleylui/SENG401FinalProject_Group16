const db = require("../config/db");

// Save a new story
const saveStory = (userId, storyTitle, storyLength, storyGenre, description, story) => {
  const sql =
    "INSERT INTO stories (user_id, title, length, genre, description, story) VALUES (?, ?, ?, ?, ?, ?)"; // Include story
  console.log("Executing SQL query:", sql, [userId, storyTitle, storyLength, storyGenre, description, story]); // Log the query and parameters
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, storyTitle, storyLength, storyGenre, description, story], (err, result) => {
      if (err) {
        console.error("Database error in saveStory:", err); // Log the error
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get all stories for a specific user
const getStoriesByUserId = (userId) => {
  const sql = "SELECT * FROM stories WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { saveStory, getStoriesByUserId };
