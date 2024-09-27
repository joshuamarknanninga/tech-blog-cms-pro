// config/connection.js

const Sequelize = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.tech_blog_db,     // Database name
  process.env.joshuamarknanninga,     // Your PostgreSQL username
  process.env.nanninga, // Your PostgreSQL password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Disable logging; set to console.log to see SQL queries
    dialectOptions: {
      // For secure connections in production (optional)
      ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
    },
  }
);

module.exports = sequelize;
