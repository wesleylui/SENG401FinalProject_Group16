const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../config/db");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

// generate story from gemini
const generate = async (prompt) => {
  return (await model.generateContent(prompt)).response.text();
};

// get all stories attached to a userId
const getStoriesByUserId = async (userId) => {
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

module.exports = { generate, getStoriesByUserId };
