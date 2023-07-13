// Dependencies
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Establishes the routes and prefixes them with the path /api
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
