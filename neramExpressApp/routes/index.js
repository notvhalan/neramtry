var express = require('express');
var router = express.Router();

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

app.get('/test-blob', async (req, res) => {
  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new StorageSharedKeyCredential(accountName, accountKey)
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const exists = await containerClient.exists();

    res.json({ containerExists: exists });
  } catch (error) {
    console.error('Azure Blob Storage Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Debug Route
app.get('/debug', (req, res) => {
  res.json({
    accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY,
    port: process.env.PORT,
  });
});
module.exports = router;
