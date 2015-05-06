var Q = require("q");
var express = require('express');
var router = express.Router();
var UserController = require("../userController");
var UserModel = require("../models/user");
var BatchModel = require("../models/batch");
var batchList = [];

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

// Retrieve all tasks for the current user
var getUserTasks = function (userId) {
  var deferred = Q.defer();

  console.log('Another promise to let the calling function know when the database lookup is complete');

  BatchModel.find({user: userId}, function (err, tasks) {
    if (!err) {
      console.log('Tasks found = ' + tasks.length);
      console.log('No errors when looking up tasks. Resolve the promise (even if none were found).');
      deferred.resolve(tasks);
    } else {
      console.log('There was an error looking up tasks. Reject the promise.');
      deferred.reject(err);
    }
  })

  return deferred.promise;
};


// Handle the request for the registration form
router.get("/register", function (req, res) {
  res.render("register");
});


// Handle the registration form post
router.post("/register", function (req, res) {
  var newUser = new UserModel(req.body);

  newUser.save(function (err, user) {
    if (err) {
      sendError(req, res, err, "Failed to register user");
    } else {
      res.redirect("/");
    }
  });
});


// Handle the login action
router.post("/login", function (req, res) {

  console.log('Hi, this is Node handling the /user/login route');

  // Attempt to log the user is with provided credentials
  UserController.login(req.body.username, req.body.password)

    // After the database call is complete and successful,
    // the promise returns the user object
    .then(function (validUser) {

      console.log('Ok, now we are back in the route handling code and have found a user');
      console.log('validUser',validUser);
      console.log('Find any tasks that are assigned to the user');

      // Now find the tasks that belong to the user
      getUserTasks(validUser._id)
        .then(function (tasks) {
          console.log("this is the valid ID " + validUser._id);
          // Render the todo list
          res.redirect("/list");
        })
        .fail(function (err) {
          sendError(req, res, {errors: err.message}, "Failed")
        });
    })

    // After the database call is complete but failed
    .fail(function (err) {
      console.log('Failed looking up the user');
      sendError(req, res, {errors: err.message}, "Failed")
    })
});

// Send the batch list back to the client via the for loop in the todoList.ejs
var sendBatchList = function (req, res, next) {
  console.log("Send batch list called");
  BatchModel.find({}, function (err, batches) {
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
    return res.redirect("/");
  }
  console.log("User value: " + UserController.getCurrentUser());  //seems to lose the user value here when func is in list.js
  sendBatchList(req, res, next);
});


module.exports = router;
