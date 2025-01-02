// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db'); // Connect to Mongo
require('dotenv').config();
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const applyRouter = require('./routes/apply');

const app = express();

// Connect to the MongoDB database
connectDB();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apply', applyRouter); // <-- We'll handle all /apply routes here
// Test Blob Storage Route
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'undefined';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'undefined';
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME || 'undefined';

if (!accountName || !accountKey || !containerName) {
  console.error('Azure Blob Storage environment variables are missing!');
  process.exit(1); // Exit the application
}

console.log('AZURE_STORAGE_ACCOUNT_NAME:', process.env.AZURE_STORAGE_ACCOUNT_NAME);
console.log('AZURE_STORAGE_ACCOUNT_KEY:', process.env.AZURE_STORAGE_ACCOUNT_KEY);
console.log('AZURE_BLOB_CONTAINER_NAME:', process.env.AZURE_BLOB_CONTAINER_NAME);

app.get('/test-blob', async (req, res) => {
  try {
    console.log('Checking Azure Blob Storage...');
    console.log('BlobServiceClient:', BlobServiceClient);

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



// Catch 404 and forward to error handler d
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Provide error details only in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render an error page (make sure you have error.ejs in /views)
  res.status(err.status || 500);
  res.render('error');
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Something broke!');
});

// tre


console.log('Application is initializing...');
console.log('Environment variables:', process.env);

module.exports = app;
