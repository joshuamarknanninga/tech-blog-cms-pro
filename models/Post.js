// models/Post.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Updated path

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // At least 1 character
      },
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // At least 1 character
      },
    },
    user_id: { // Foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize, // Use the imported sequelize instance
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
