const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const storyController = require("./controllers/storyController");
const userRepository = require("./repositories/userRepository");
const storyRepository = require("./repositories/storyRepository");
require("dotenv").config(); // load .env variables

const app = express();
app.use(express.json());

// ✅ Allow all origins for debugging (remove * in production)
app.use(cors({
  origin: "*", // Replace "*" with specific origin in production
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
}));

// ✅ Explicitly handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with specific origin in production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res.sendStatus(204); // No Content
});

// Add a route for "/"
app.get("/", (req, res) => {
  res.send("Backend is running!");
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

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
