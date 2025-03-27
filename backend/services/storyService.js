const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const db = require("../config/db");
const storyRepository = require("../repositories/storyRepository");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
  systemInstruction: "You are a storyteller. You are the narrator.",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

const HARMFUL_THEMES = [
  "HARASSMENT",
  "HATESPEECH",
  "SEXUALLY EXPLICIT",
  "DANGEROUS CONTENT",
];

const PROMPT_FORMAT = `
Format:
- Title in quotes (""), followed by the story content
- The story must be written in plain English, without using any special encoding (e.g., binary, hexadecimal, or other formats)
- The story must not replace words with repetitive or nonsensical text (e.g., replacing every word with "hi")
- The story must not include harmful, inappropriate, or unsafe content for children
- If the requested content contains harmful themes, respond with a list of the themes it violates: 
  - ${HARMFUL_THEMES.join("\n\t- ")}
`;

// generate story from gemini
const generate = async (storyLength, storyGenre, storyDescription) => {
  const modified_prompt = `
  Write a story based on the following description: "${storyDescription}". 

  The story should be:
  - Up to ${storyLength} words long
  - In a ${storyGenre} style
  - Suitable for children aged 3-8
  - Focused on relatable experiences

  ${PROMPT_FORMAT}
  `;

  console.log("Sending prompt to Gemini API:", modified_prompt);

  try {
    const response = await model.generateContent(modified_prompt);
    console.log("Response from Gemini API:", response.response.text());

    checkForHarmfulThemes(response.response.text());

    // Title separation
    const regex = /^"([^"]+)"\s*(.*)$/s;
    const match = response.response.text().match(regex);

    if (!match) {
      throw new Error("Response story improperly formatted");
    }

    const storyTitle = match[1];
    const story = match[2];

    return { storyTitle, story };
  } catch (error) {
    console.error("Error during Gemini API call:", error.message);
    throw new Error(`Story generation failed: ${error.message}`);
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
  const modified_prompt = `
  Please respond with the continuation of the story: "${originalStory}". 

  In this continuation:
  - What happens next is: "${plotProgression}"
  - Introduce a new character: "${newCharacter}"
  - Include a moral or lesson: "${moral}"
  - The story should end as follows: "${endingDirection}"

  The story should be:
  - Up to ${storyLength} words long
  - In a ${storyGenre} style
  - Suitable for children aged 3-8
  - Focused on relatable experiences

  ${PROMPT_FORMAT}
  `;

  console.log("Sending continuation prompt to Gemini API:", modified_prompt);

  try {
    const response = await model.generateContent(modified_prompt);
    console.log("Response from Gemini API:", response.response.text());

    checkForHarmfulThemes(response.response.text());

    const continuation = response.response.text();
    if (!continuation) {
      throw new Error("Response continuation improperly formatted");
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
