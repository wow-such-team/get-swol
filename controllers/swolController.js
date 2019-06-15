var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var workout = require("../models/workout.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  workout.all(function(data) {
    var hbsObject = {
      workouts: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});