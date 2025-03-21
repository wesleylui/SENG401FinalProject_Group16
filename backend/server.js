const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const storyController = require("./controllers/storyController");
const userRepository = require("./repositories/userRepository");
const storyRepository = require("./repositories/storyRepository");
require("dotenv").config(); // load .env variables

const app = express();
app.use(express.json());

// Dynamically set allowed origins based on environment
const allowedOrigins =
  process.env.ENV === "deployment" || process.env.ENV === "production" // do NOT change this line
    ? ["https://story-bedtime-generator.netlify.app"] // Deployed frontend
    : ["http://localhost:5173"]; // Local development

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

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

// Add this to server.js
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5050; // Use Railway's dynamic port or default to 5050
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
