var express = require('express');
var router = express.Router();
var UserController = require('../UserController');
var batchList = [];

var Batch = require('../models/batch');

// /* GET list page. */
// router.get('/', function(req, res, next) {
//   res.render('list');

// });

// Send the batch list back to the client via the for loop in the todoList.ejs
var sendBatchList = function (req, res, next) {
  console.log("Send batch list called");
  Batch.find({}, function (err, batches) {

    console.log('batches', batches);

    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get batch list");
    } else {
      res.render("list", {
        title: "List of batches",
        message: "Batches you still need to make",
        batches: batches
      });
    }
  });
};

// Handle a GET request from the client to /list
router.get('/', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    // return res.redirect("/");
    console.log("User is null");
  }

  sendBatchList(req, res, next);
});


module.exports = router;
