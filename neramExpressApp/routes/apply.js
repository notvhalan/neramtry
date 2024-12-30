const express = require('express');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const mongoose = require('mongoose');
const Application = require('../models/Application');

const mongoURI = process.env.MONGO_URI; // Ensure this is set in .env

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    if (file.mimetype !== 'application/pdf') {
      throw new Error('Only PDF files are allowed.');
    }
    return {
      bucketName: 'resumes',
      filename: `resume_${Date.now()}_${file.originalname}`
    };
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('applypage');
});

// POST /apply using GridFS
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    console.log('File received:', req.file);

    if (!req.file) {
      return res.status(400).send('Resume file is required.');
    }

    const { name, email, role } = req.body;
    const resumeId = req.file.id;

    console.log('Resume ID:', resumeId);

    const newApplication = new Application({
      name,
      email,
      role,
      resumeId
    });

    await newApplication.save();
    res.redirect('/apply/success');
  } catch (err) {
    console.error('Error saving application:', err);
    res.status(500).send('Server error');
  }
});

router.get('/success', (req, res) => {
  res.render('applySuccess');
});

// GET /resume/:id to retrieve resume
router.get('/resume/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application || !application.resumeId) {
      return res.status(404).send('Resume not found.');
    }

    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'resumes'
    });

    const downloadStream = gfs.openDownloadStream(application.resumeId);

    res.set('Content-Type', 'application/pdf');
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error streaming file.');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
