const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

module.exports = connectToMongo;