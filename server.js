// Dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Establishes the port and starts the express.js server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Displays a message once the server is running
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The API server is now running at port ${PORT}!`);
  });
});
