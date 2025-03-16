const storyService = require("../services/storyService");

// Story generate API
const generate = async (req, res) => {
  try {
    const { prompt } = req.body;
    const story = await storyService.generate(prompt);
    res.status(201).json({ story, message: "Story generated successfully" }); 
  } catch (error) {
    console.error("Story generation error:", error); // Add detailed error logging
    res.status(500).json({ error: "Story generation failed" });
  }
};


module.exports = { generate };
