// Mongoose connection to MongoDB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/batch');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Hooray, we are connected to Mongo!');
});