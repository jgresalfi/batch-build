var express = require('express');
var form = express.Router();

/* GET home page. */
form.get('/', function(req, res, next) {
  res.render('form');
});

module.exports = form;
