const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", userController.signup);
app.post("/login", userController.login);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
