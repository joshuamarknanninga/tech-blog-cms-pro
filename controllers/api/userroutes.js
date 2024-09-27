// controllers/api/userRoutes.js

const router = require('express').Router();
const { User } = require('../../models');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Automatically log in the user after signup
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(201).json(userData);
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to sign up user.', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Find the user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    // Check if the password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    // Save session variables and log in the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to log in user.', error: err.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // No Content
    });
  } else {
    res.status(404).json({ message: 'No active session found.' });
  }
});

module.exports = router;
