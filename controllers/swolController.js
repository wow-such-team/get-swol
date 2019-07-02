var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var saltRounds = 10;

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

router.get("/search/:id", function(req, res) {
  res.render("search")
});

  //When the new user signs up
  router.post("/api/users", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      console.log("hash: " + hash)
      var hashpw = hash.replace("/", "*****");
        workout.createUser(["username", "email", "password", "firstname", "lastname"
      ], [
        req.body.username, req.body.email, hashpw, req.body.firstName, req.body.lastName
      ], function(data) {
        if(data) {
          // res.json( { id: data.insertID })
          // console.log("data = " + data)
          res.json({ redirect: "/navigate/" + hashpw});
        }
      });
    });
  });

  //When a returning user logs in
  router.post("/api/users_verify", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var condition = "username = '" + username + "'";

    workout.verifyUser(condition, function(result) {
      console.log(condition);
      console.log(result)
    
      if(result.length === 0) {
        console.log("result.length = " + result.length)
        var error = {
          errorMessage: "*username does not exist"
        };
        // res.render ("index", error)
        res.json({ redirect: "/error"});
      }
      else {
        var pw = result[0].password
        var pwcompare = pw.replace("*****", "/")
        bcrypt.compare(password, pwcompare, function(err, results) {
          if (results === true) {
            res.json ({ redirect: "/navigate/" + result[0].password})
          }
          else {
            res.json({ redirect: "/errorpw"})
          }
        })
      }
    })
  });

  router.post("/search/:id", function(req, res) {
    var searchWorkout = req.body.exerciseSearch;
    console.log(searchWorkout);


    res.json({redirect: "/search/" + req.params.id + "/" + searchWorkout})
  })

  router.post("/search/:id/:muscletype", function(req, res) {
    var searchWorkout = req.body.exerciseSearch;
    res.json({redirect: "/search/" + req.params.id + "/" + searchWorkout})
  })

  router.get("/search/:id/:muscletype", function(req, res) {
    var muscleType = req.params.muscletype;
    var condition = "muscles = ' " + muscleType + "'";

    workout.selectExerciseWhere(condition, function(result) {
      console.log(condition);
      console.log(result)
      var exerciseName = {
        exercises: result
      };
      console.log(exerciseName)
      res.render("search", exerciseName)
    })

  })

  router.get("/explore/:id", function(req, res) {

    workout.allPremadeWO(function(result) {
      var armsWOs = [];
      var fullBodyWOs = [];
      var legsWOs = [];
      var coreWOs = [];
      var csbWOs = [];
      for(var i=0; i<result.length; i++) {
        switch(result[i].WOType) {
          case "full body":
            fullBodyWOs.push(result[i]);
            break;
          case "arms":
            armsWOs.push(result[i]);
            break;
          case "legs":
            legsWOs.push(result[i]);
            break;
          case "chest/shoulders/back":
            csbWOs.push(result[i]);
            break;
          case "core":
            coreWOs.push(result[i]);
            break;
        }
      };

      var hbsObject = {
        fullbody: fullBodyWOs,
        arms: armsWOs,
        legs: legsWOs,
        csb: csbWOs,
        core: coreWOs
      };

      console.log(hbsObject);
      
      res.render("explore", hbsObject);
    });
  });

  router.get("/navigate/:id", function(req, res) {
    var pwhash = req.params.id
    console.log(pwhash);
    var condition = "password = '" + pwhash + "'";
    workout.verifyUser(condition, function(result) {
      console.log(condition);
      console.log(result)
      var navigateUsername = {
        name: result[0].firstname
      }
      res.render("navigate", navigateUsername)
    })
  });

  router.get("/error", function(req, res) {
    var error = {
      errorMessage: "*username does not exists. Please register."}
      res.render("index", error)
  });
  router.get("/errorpw", function(req, res) {
    var error = {
      errorMessage: "*password is incorrect"}
      res.render("index", error)
  });

  router.get("/navigate/:id/search", function(req, res) {
    var id = req.params.id
    console.log(id)
    res.json({ redirect: "/search/" + id})
  })

  router.get("/navigate/:id/explore", function(req, res) {
    var id = req.params.id
    console.log(id)
    res.json({ redirect: "/explore/" + id})
  })

 

module.exports = router;