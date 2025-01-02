const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// View engine setup test
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // Logs HTTP requests
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Provide error details only in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
