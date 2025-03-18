const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Story = sequelize.define("Story", {
  // id of user who generated the story
  userId: {
    type: DataTypes.INT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  length: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  story: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Story;
