var Q = require("q");
var express = require('express');
var form = express.Router();
var UserController = require("../userController");
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
  res.render('form', {
    currentBatch:{
      cook_date: "",
      exp_date: "",
      notes: "",
      candyType: "",
      batch: "",
      sugarId: "",
      butterId: "",
      almondId: "",
      chocolateId: "",
      dustId: "",
      cook_order: "",
      user: ""
    }
  });
});

// Handle a GET request from the client to /list/:id
form.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  BatchModel.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a task with that id");

    // Find was successful
    } else {
      res.render('form', {
        currentBatch: thisItem
      });
    }
  });
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

// Handle a DELETE request from the client to /form
form.delete('/', function (req, res) {
  console.log(req.body);
  BatchModel.find({ _id: req.body._id }).remove(function (err) {

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
