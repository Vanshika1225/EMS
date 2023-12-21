
process.env.NODE_OPTIONS = '--tls-min-v1.0';
const express = require('express');
const mongoose = require('./db'); // Assuming you have a 'db.js' file for connecting to MongoDB
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Use your routes
app.use('/employees', routes);
app.use('/auth',routes);
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
