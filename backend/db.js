const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/billbuzz');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

module.exports = connectToMongo;