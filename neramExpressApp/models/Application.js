// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  
  // Add a field for the PDF data (as a Buffer)
  resumeData: {
    type: Buffer
  },
  // You can store the content type (e.g. 'application/pdf')
  resumeContentType: {
    type: String
  }
});

module.exports = mongoose.model('Application', applicationSchema);
