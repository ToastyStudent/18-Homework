// Dependencies
const router = require('express').Router();
const apiRoutes = require('./api');

// Establishes the routes and prefixes the api routes with /api
router.use('/api', apiRoutes);

// Sends a message to the user if they try to access a route that doesn't exist
router.use((req, res) => {
  return res.send('This route does not exist!');
});

module.exports = router;
