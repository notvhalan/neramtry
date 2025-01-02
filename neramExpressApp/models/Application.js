// models/Application.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  resumeId: { type: ObjectId },  // ID of the file in GridFS
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
