const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const storyController = require("./controllers/storyController");
const userRepository = require("./repositories/userRepository");
const storyRepository = require("./repositories/storyRepository");
require("dotenv").config(); // load .env variables

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://story-bedtime-generator.netlify.app", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow cookies if needed
}));

// Initialize the database
Promise.all([
  userRepository.initializeDatabase(),
  storyRepository.initializeDatabase(),
])
  .then(() => {
    console.log(
      `✅ Databases ${
        process.env.ENV === "deployment" ? "reset and " : ""
      }initialized!`
    );
  })
  .catch((err) => {
    console.error("❌ Database initialization failed:", err);
  });

app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.post("/generate", storyController.generate);
app.get("/stories/:userId", storyController.getStoriesByUserId);
app.post("/save-story", storyController.saveStory);
app.delete("/stories/:id", storyController.deleteStoryById);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
