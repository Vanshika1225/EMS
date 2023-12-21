process.env.NODE_OPTIONS = '--tls-min-v1.0';
const express = require('express');
const mongoose = require('./db'); // Assuming you have a 'db.js' file for connecting to MongoDB
const routes = require('./routes');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
// Middleware to decode JWT and attach user to request
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    console.log(token);
    console.log('JWT_SECRET_KEY:', secretKey);

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Use the middleware for routes that require authentication
app.use(authenticateJWT);
// Use your routes
app.use('/employees', routes);
app.use('/auth', routes);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
