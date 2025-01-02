const express = require('express');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const Application = require('../models/Application');
const router = express.Router();
require('dotenv').config();

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage so files are kept in RAM
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});

// Azure Storage Configuration
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerClient = blobServiceClient.getContainerClient(containerName);

// Ensure the container exists (optional, run once to create the container)
(async () => {
  if (!await containerClient.exists()) {
    await containerClient.create();
    console.log(`Container "${containerName}" created.`);
  }
})();

// GET /apply - Render the application page
router.get('/apply', (req, res) => {
  res.render('applypage');
});



// POST /apply - Handle file upload
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!req.file) {
      return res.status(400).send('Resume file is required.');
    }

    const blobName = `resume_${Date.now()}_${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file to Azure Blob Storage
    await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype }
    });

    console.log(`File uploaded to Azure Blob Storage as ${blobName}`);

    // Save metadata to MongoDB (if needed)
    const newApplication = new Application({
      name,
      email,
      role,
      resumeUrl: blockBlobClient.url // Save the Blob URL for later retrieval
    });

    await newApplication.save();
    res.redirect('/apply/success');
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Server error');
  }
});

// GET /success - Render success page
router.get('/success', (req, res) => {
  res.render('applySuccess');
});

// GET /resume/:id - Retrieve resume URL
router.get('/resume/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application || !application.resumeUrl) {
      return res.status(404).send('Resume not found.');
    }

    res.redirect(application.resumeUrl); // Redirect to Azure Blob Storage URL
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});




module.exports = router;
