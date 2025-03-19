const db = require("../config/db");

const initializeDatabase = () => {
  const env = process.env.ENV; // Get the environment variable
  const sql = `
    ${env === "deployment" ? "DROP TABLE IF EXISTS stories;" : ""}
    CREATE TABLE IF NOT EXISTS stories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      length INT NOT NULL,
      genre VARCHAR(177) NOT NULL,
      description TEXT NOT NULL,
      story TEXT NOT NULL,
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ${
      env === "deployment"
        ? `INSERT INTO stories (user_id, title, length, genre, description, story) VALUES
          (1, "Arthur's Craft", "100", 'fairy tale', "Write a story about a student API developer",
          "Once upon a time, in the shimmering kingdom of Silicon Valley, lived a young student, Arthur, an API Developer. He dreamed of crafting enchanted interfaces. One day, a grumpy King, plagued by slow data, tasked Arthur with a quest: build a lightning-fast API!\n\nArthur, with his trusty laptop and knowledge of REST, toiled night and day. He conjured endpoints, summoned JSON responses, and vanquished bugs with skillful debugging. Finally, he presented his API. The King, delighted, found his kingdom's data flowing with unprecedented speed. Arthur was celebrated, and lived happily ever after, building APIs for all the land.\n");`
        : ""
    }
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Save a new story
const saveStory = (userId, storyTitle, storyLength, storyGenre, description, story) => {
  const sql =
    "INSERT INTO stories (user_id, title, length, genre, description, story) VALUES (?, ?, ?, ?, ?, ?)";
  console.log("Executing SQL query:", sql, [userId, storyTitle, storyLength, storyGenre, description, story]);
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, storyTitle, storyLength, storyGenre, description, story], (err, result) => {
      if (err) {
        console.error("Database error in saveStory:", err);
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

const deleteStoryById = (id) => {
  const sql = "DELETE FROM stories WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Database error in deleteStoryById:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { initializeDatabase, saveStory, getStoriesByUserId, deleteStoryById };
