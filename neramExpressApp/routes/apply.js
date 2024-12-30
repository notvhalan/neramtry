// routes/apply.js
const express = require('express');
const multer = require('multer');
const Application = require('../models/Application');

const router = express.Router();

// Use memory storage so the file is not written to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// GET /apply
router.get('/', (req, res) => {
  res.render('applypage');
});

// POST /apply
// Notice how we're using upload.single('resume') 
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // If there's a file, store it in the DB as binary
    let resumeData, resumeContentType;
    if (req.file) {
      resumeData = req.file.buffer;            // PDF data (buffer)
      resumeContentType = req.file.mimetype;   // 'application/pdf'
    }

    const newApplication = new Application({
      name,
      email,
      role,
      resumeData,
      resumeContentType,
    });

    await newApplication.save();
    res.redirect('/apply/success');
  } catch (err) {
    console.error('Error saving application:', err);
    res.status(500).send('Server error');
  }
});

// GET /apply/success
router.get('/success', (req, res) => {
  res.render('applySuccess');
});

module.exports = router;
