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

// get all stories for a userId
const getStoriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await storyService.getStoriesByUserId(userId);
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

module.exports = { generate, getStoriesByUserId };
