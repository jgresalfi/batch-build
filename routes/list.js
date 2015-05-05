var express = require('express');
var router = express.Router();
var batchList = [];

var Batch = require('../models/batch');

/* GET list page. */
router.get('/', function(req, res) {
  res.render('list');
});


module.exports = router;
