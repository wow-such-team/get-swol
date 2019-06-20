var express = require("express");

var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/favorites", function(req, res) {
    res.render("favorites");
});

//Facebook authentication?
var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: "883328152001251",
    clientSecret: "b374221e853f607b9ef1223ad56fa01f",
    callbackURL: "/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

router.use(passport.initialize());
router.use(passport.session());

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/favorites');
  });

module.exports = router;