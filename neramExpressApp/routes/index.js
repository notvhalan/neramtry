var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/strategies', function(req, res, next) {
  res.render('strategies'); // Render the strategies.ejs page
});
module.exports = router;
