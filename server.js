// server.js

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const helmet = require('helmet'); // Optional for security
const rateLimit = require('express-rate-limit'); // Optional for rate limiting
const morgan = require('morgan'); // Optional for logging

// Load environment variables from .env file
dotenv.config();

// Import Sequelize instance and models
const sequelize = require('./config/connection'); // Ensure this path is correct
const { User, Post, Comment } = require('./models'); // Import models

// Import routes
const routes = require('./controllers');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up session with Sequelize store
const sess = {
  secret: process.env.SESSION_SECRET,
  // Configure cookie to expire after 1 hour (adjust as needed)
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use session middleware
app.use(session(sess));

// Optional: Use Helmet for security
app.use(helmet());

// Optional: Use Morgan for logging
app.use(morgan('dev'));

// Optional: Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set up Handlebars.js as the view engine
const hbs = exphbs.create({
  // You can add custom helpers here if needed
  helpers: {
    // Example helper to format date
    format_date: (date) => {
      return new Date(date).toLocaleDateString();
    },
    // Add more helpers as needed
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined in the controllers
app.use(routes);

// Optional: Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { error: err.message });
});

// Catch-all route to render 404 page for undefined routes
app.use((req, res) => {
  res.status(404).render('404');
});

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
