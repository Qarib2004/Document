const mongoose = require("mongoose")


const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topics: [String],
    major: { type: String, required: true },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    schedule: [{
      day: String,
      time: String
    }]
  }, { timestamps: true });
  
  const Class = mongoose.model('Class', classSchema);


  module.exports = Class