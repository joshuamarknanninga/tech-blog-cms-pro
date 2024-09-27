// models/Comment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Updated path

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // At least 1 character
      },
    },
    post_id: { // Foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    modelName: 'comment',
  }
);

module.exports = Comment;
