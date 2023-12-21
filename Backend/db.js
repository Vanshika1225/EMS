const mongoose = require('mongoose');

// Set the strictQuery option to false to address the deprecation warning
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/EMS');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // You can start your   Express.js application or perform other operations here.
});

// Export the mongoose instance if needed
module.exports = mongoose;
