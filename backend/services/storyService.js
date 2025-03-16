const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const generate = async (prompt) => {
    return (await model.generateContent(prompt)).response.text();
}

module.exports = { generate };