const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allows storing any dynamic JSON object
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
