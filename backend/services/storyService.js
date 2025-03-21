const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../config/db");
const storyRepository = require("../repositories/storyRepository");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
  systemInstruction: "You are a storyteller. You are the narrator.",
});

// generate story from gemini
const generate = async (storyLength, storyGenre, storyDescription) => {
  const modified_prompt = `Write an up to ${storyLength} word story in a ${storyGenre} style based on the following description: "${storyDescription}". Please respond with the title surrounded by quotes ("") followed by the story.`;
  console.log("Sending prompt to Gemini API:", modified_prompt);

  try {
    const response = await model.generateContent(modified_prompt);

    console.log("Response from Gemini API:", response.response.text());

    const regex = /^"([^"]+)"\s*(.*)$/s;
    const match = response.response.text().match(regex);

    const storyTitle = match[1];
    const story = match[2];
    if (!match) {
      console.error("Response title or story improperly formatted");
      // throw new error;
    }

    return { storyTitle, story };
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw error;
  }
};

// continue story from gemini
const continueStory = async (
  originalStory,
  storyLength,
  storyGenre,
  plotProgression,
  newCharacter,
  moral,
  endingDirection
) => {
  const modified_prompt = `Please respond with the continuation of the story: "${originalStory}". 
What happens next is: "${plotProgression}". 
Introduce a new character: "${newCharacter}". 
Include a moral or lesson: "${moral}". 
The story should end as follows: "${endingDirection}". 
Write this continuation in up to ${storyLength} words in a ${storyGenre} style.`;

  console.log("Sending continuation prompt to Gemini API:", modified_prompt);

  try {
    const response = await model.generateContent(modified_prompt);
    console.log("Response from Gemini API:", response.response.text());

    const continuation = response.response.text();
    if (!continuation) {
      console.error("Response continuation improperly formatted");
      // throw new error;
    }

    return { continuation };
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

// delete existing story
const deleteStoryById = async (id) => {
  try {
    return await storyRepository.deleteStoryById(id);
  } catch (error) {
    console.error("Error in deleteStoryById service:", error);
    throw error;
  }
};

module.exports = {
  generate,
  continueStory,
  getStoriesByUserId,
  saveStory,
  deleteStoryById,
};
