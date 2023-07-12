// Dependency of the Mongoose npm package
const mongoose = require('mongoose');

// Establishes connection to MongoDB database using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');

module.exports = mongoose.connection;
