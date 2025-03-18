const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../config/db");
const storyRepository = require("../repositories/storyRepository");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
  systemInstruction: "You are a storyteller. You are the narrator.",
});

// generate story from gemini
const generate = async (
  storyTitle,
  storyLength,
  storyGenre,
  storyDescription
) => {
  const modified_prompt = `Write a ${storyLength} word story in a ${storyGenre} style titled "${storyTitle}" based on the following description: "${storyDescription}". Respond with only the story.`;
  console.log("Sending prompt to Gemini API:", modified_prompt);

  try {
    const response = await model.generateContent(modified_prompt);
    console.log("Response from Gemini API:", response.response.text());
    return response.response.text();
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw error;
  }
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

// save generated story to a userId
const saveStory = async (
  userId,
  storyTitle,
  storyLength,
  storyGenre,
  storyDescription,
  story
) => {
  try {
    return await storyRepository.saveStory(
      userId,
      storyTitle,
      storyLength,
      storyGenre,
      storyDescription,
      story
    );
  } catch (error) {
    console.error("Database error in saveStory:", error);
    throw error;
  }
};

module.exports = { generate, getStoriesByUserId, saveStory };
