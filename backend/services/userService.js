const userRepository = require("../repositories/userRepository");

const signup = async (username, password) => {
  return await userRepository.createUser(username, password);
};

const login = async (username, password) => {
  const user = await userRepository.findUser(username, password);
  return user ? { id: user.id, username: user.username } : null; // Return user object with id and username
};

module.exports = { signup, login };
