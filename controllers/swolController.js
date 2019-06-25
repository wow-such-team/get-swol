var express = require("express");
var router = express.Router();

var keys = require("../config/keys.js");


//Import model (workout.js) to use the database functions.
var workout = require("../models/workout.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/favorites", function(req, res) {
    res.render("favorites");
});


router.get("/navigate", function(req, res) {
  res.render("navigate")
});

//Facebook authentication

// var keys = require("../../../keys.js")
// var express = require("express");
// var passport = require('passport')
// var Strategy = require('passport-facebook').Strategy;


// passport.use(new Strategy({
//     clientID: "883328152001251",
//     clientSecret: "8811809cee5f20db1895e7e0f479569a",
//     callbackURL: "/return",
//     profileFields: ["id", "displayName", "email"]
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
// }));

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });

  
// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });

// router.use(passport.initialize());
// router.use(passport.session());

// router.get('/login/facebook', passport.authenticate('facebook'));


// router.get('/return',
//   passport.authenticate('facebook', { failureRedirect: '/'}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     var user = req.user.id;
//     res.redirect('/favorites/'+ user);
//   }
//   );

  //When the new user signs up
  router.post("/api/users", function(req, res) {
    workout.createUser(["username", "email", "password", "fullName"
    ], [
      req.body.username, req.body.email, req.body.password, req.body.fullName
    ], function(result) {
      res.json({ id: result.insertID });
    });
  });

  //When a returning user logs in
  router.post("/api/users_verify", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var condition = "username = '" + username + "'" + "AND password = '" + password + "'";

    workout.verifyUser(condition, function(result) {
      console.log(condition)
      if(result.length === 0) {
        console.log("not verified - username does not exist in users table")
        res.status(200).json({redirect: "/"});
      }
      else {
        console.log('verified. Username exists in users table');
        res.json({redirect: "/navigate"})
      }
    });
  });
module.exports = router;