const userRepository = require("../repositories/userRepository");

const signup = async (username, password) => {
  return await userRepository.createUser(username, password);
};

const login = async (username, password) => {
  return await userRepository.findUser(username, password);
};

module.exports = { signup, login };
