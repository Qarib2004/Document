const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://garibalisultanov:garibalisultanov@cluster0.rfcju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;