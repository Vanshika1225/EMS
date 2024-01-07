process.env.NODE_OPTIONS = '--tls-min-v1.0';
const express = require('express');
const mongoose = require('./db'); // Assuming you have a 'db.js' file for connecting to MongoDB
const routes = require('./routes');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors())
// Middleware to decode JWT and attach user to request

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if(req.path==='/auth/signup'){
    return next();
  }
  if(req.path==='/auth/login'){
    return next();
  }
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    console.log(token);
    console.log(secretKey);
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// // Use the middleware for routes that require authentication
app.use(authenticateJWT);
// Use your routes
app.use('/employees', routes);
app.use('/auth', routes);
// app.use('/', routes);
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
