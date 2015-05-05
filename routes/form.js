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

// Handle the new batch form post
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

// Handle a DELETE request from the client to /batch
form.delete('/', function (req, res) {
  batchList.find({ _id: req.body.batch_id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the batch");

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });
});

module.exports = form;
