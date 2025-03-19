const userService = require("../services/userService");

// User Signup API
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.signup(username, password);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error); // Add detailed error logging
    res.status(500).json({ error: "Signup failed" });
  }
};

// User Login API
const login = async (req, res) => {
  try {
    console.log("Login request received:", req.body); // Log incoming request
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    console.log("Login result:", result); // Log result from service
    if (result) {
      res.status(200).json({ success: true, userId: result.id, username: result.username, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
};

module.exports = { signup, login };
