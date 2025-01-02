var express = require('express');
var router = express.Router();
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/strategies', function(req, res, next) {
  res.render('strategies'); // Render the strategies.ejs page
});

router.get('/careers', function (req, res, next) {
  res.render('careers'); // Render the careers.ejs page
});


// Debug Route
router.get('/debug', (req, res) => {
  res.json({
    accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY,
    port: process.env.PORT,
  });
});

router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = router;
