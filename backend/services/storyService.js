const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL,
    systemInstruction: "You are a storyteller. You are the narrator.",
  });

const generate = async (prompt, storyLength, storyGenre) => {
    const modified_prompt = `Write a ${storyLength} word story in a ${storyGenre} style about ${prompt}. Respond with only the story.`;
    console.log(modified_prompt);
    return (await model.generateContent(modified_prompt)).response.text();
}

module.exports = { generate };