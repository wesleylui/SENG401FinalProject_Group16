const express = require("express");
const cors = require("cors");
// const mysql = require("mysql2");
const userController = require("./controllers/userController");
// const userRepository = require("./repositories/userRepository");
// require("dotenv").config(); // load .env variables

const app = express();
app.use(express.json());
app.use(cors());

// Configure CORS to accept requests from your deployed frontend
// const corsOptions = {
//   origin: "https://story-bedtime-generator.netlify.app", // Replace with your deployed frontend domain
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Use DATABASE_URL from environment variables
// const mysqlConnection = mysql.createConnection(process.env.DATABASE_URL);

// mysqlConnection.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed (server.js):", err.stack);
//     return;
//   }
//   console.log("✅ Connected to the MySQL database! (server.js)");

  // Initialize the database
//   userRepository
//     .initializeDatabase()
//     .then(() => {
//       console.log("✅ Database initialized!");
//     })
//     .catch((err) => {
//       console.error("❌ Database initialization failed:", err);
//     });
// });

app.post("/signup", userController.signup);
app.post("/login", userController.login);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
