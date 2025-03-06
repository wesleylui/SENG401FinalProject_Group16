// Example using Sequelize
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedtimeStory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = User;
