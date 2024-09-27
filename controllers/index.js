// controllers/index.js

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// Add other route imports as needed

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// 404 handler for API routes
router.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = router;
