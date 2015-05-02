var Q = require("q");
var express = require('express');
var form = express.Router();
var BatchModel = require("../models/batch");

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  console.log('Render the error template back to the client.');
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

/* GET home page. */
form.get('/', function(req, res, next) {
  res.render('form');
});

// Handle the registration form post
form.post("/", function (req, res) {
  var newBatch = new BatchModel(req.body);

  newBatch.save(function (err, user) {
    if (err) {
      sendError(req, res, err, "Failed to add new batch");
    } else {
      console.log(newBatch ,"Success!");
      res.redirect("/form");
    }
  });
});

module.exports = form;
