// models/index.js

const sequelize = require('../config/connection'); // Correct relative path

// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations

// User can have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// User can have many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment, sequelize };
