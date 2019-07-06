var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var saltRounds = 10;

//Import model (workout.js) to use the database functions.
var workout = require("../models/workout.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/favorites/:id", function (req, res) {
  var hashpw = req.params.id;

  workout.allUserFavs(hashpw, function(result) {
    console.log(result);
    // var premadeFavsIDs = [];
    var singleFavsIDs = [];
    // var premadeFavs;
    var singleFavs;

    for(var i=0; i<result.length; i++) {
      if(result[i].refTable==="exercises") {
        singleFavsIDs.push(result[i].refID);
      }
      // else if(result[i].refTable==="premadeWO") {
      //   premadeFavsIDs.push(result[i].refID);
      // };
    };

    workout.selectExerciseWhereIn("id", singleFavsIDs, function(response) {
      singleFavs = response;
      console.log("single favs");
      console.log(singleFavs);

      // workout.selectPremadeWOWhereIn("id", premadeFavsIDs, function(results) {
      //   premadeFavs = results;
      //   console.log("premade favs");
      //   console.log(premadeFavs);

        var hbsObject = {
          singles: singleFavs,
          // premades: premadeFavs
        };
      
        console.log("handlebars object");
        console.log(hbsObject);
      
        res.render("favorites", hbsObject);
      // });
    });
  });
});

router.get("/search/:id", function (req, res) {
  res.render("search")
});

//When the new user signs up
router.post("/api/users", function (req, res) {
  var condition = "username='" + req.body.username + "'";

  // checks if username already exists
  workout.verifyUser(condition, function(response) {
    console.log(condition);
    console.log(response);

    // if username is not already in use, allow creation of new user
    if(response.length===0) {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        console.log("hash: " + hash)
        var hashpw = hash.split("/").join("*****");
    
        workout.createUser(["username", "email", "password", "firstname", "lastname"
        ], [
            req.body.username, req.body.email, hashpw, req.body.firstName, req.body.lastName
          ], function (data) {
            if (data) {
    
              console.log(req.body.username);
    
              workout.createUserTable(req.body.username.trim(), function (result) {    
                res.json({ redirect: "/navigate/" + hashpw });
              });
    
            };
          });
    
    
      });
    }
    // if username already exists, error message
    else {
      res.json({ redirect: "/tryagain" });
    };
  });

  
});

//When a returning user logs in
router.post("/api/users_verify", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var condition = "username = '" + username + "'";
  workout.verifyUser(condition, function (result) {
    console.log(condition);
    console.log(result)

    if (result.length === 0) {
      console.log("result.length = " + result.length)
      var error = {
        errorMessage: "*username does not exist"
      };
      // res.render ("index", error)
      res.json({ redirect: "/error" });
    }
    else {
      var pw = result[0].password
      var pwcompare = pw.split("*****").join("/")
      bcrypt.compare(password, pwcompare, function (err, results) {
        if (results === true) {
          res.json({ redirect: "/navigate/" + result[0].password })
        }
        else {
          res.json({ redirect: "/errorpw" })
        }
      })
    }
  })
});

router.get("/api/premadeWO", function(req, res) {
  
});

router.get("/premadeWO/:workoutID/:id", function (req, res) {
  var woID = parseInt(req.params.workoutID);
  console.log("workout ID: " + woID);

  workout.selectPremadeWoWhere("id =" + woID, function (result) {
    console.log("id result " + result);

    workout.selectExerciseWhereIn("id", result.exerciseList, function (response) {
      console.log(response);

      var hbsObject = {
        exercise: response
      };

      res.render("premadeWO", hbsObject);
    });
  });
});


router.post("/search/:id", function (req, res) {
  var searchWorkout = req.body.exerciseSearch;
  console.log(searchWorkout);


  res.json({ redirect: "/search/" + req.params.id + "/" + searchWorkout })
})

router.post("/search/:id/:muscletype", function (req, res) {
  var searchWorkout = req.body.exerciseSearch;
  res.json({ redirect: "/search/" + req.params.id + "/" + searchWorkout })
})

router.get("/search/:id/:muscletype", function (req, res) {
  var muscleType = req.params.muscletype;
  var condition = "muscles = ' " + muscleType + "'";

  workout.selectExerciseWhere(condition, function (result) {
    console.log(condition);
    console.log(result)
    var exerciseName = {
      exercises: result
    };
    console.log(exerciseName)
    res.render("search", exerciseName)
  });

})

router.get("/explore/:id", function (req, res) {
  workout.allPremadeWO(function (result) {
    var armsWOs = [];
    var fullBodyWOs = [];
    var legsWOs = [];
    var coreWOs = [];
    var csbWOs = [];
    for (var i = 0; i < result.length; i++) {
      switch (result[i].WOType) {
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


router.get("/navigate/:id", function (req, res) {
  var pwhash = req.params.id
  console.log(pwhash);
  var condition = "password = '" + pwhash + "'";
  workout.verifyUser(condition, function (result) {
    console.log(condition);
    console.log(result)
    var navigateUsername = {
      name: result[0].firstname
    }
    res.render("navigate", navigateUsername)
  })
});

router.get("/error", function (req, res) {
  var error = {
    errorMessage: "*username does not exists. Please register."
  }
  res.render("index", error)
});

router.get("/tryagain", function (req, res) {
  var error = {
    tryAgainMessage: "*Username is already taken. Please try again."
  };

  res.render("index", error);
});

router.get("/errorpw", function (req, res) {
  var error = {
    errorMessage: "*password is incorrect"
  }
  res.render("index", error)
});
//Routing after logging in
router.get("/navigate/:id/search", function (req, res) {
  var id = req.params.id
  console.log(id)
  res.json({ redirect: "/search/" + id })
})

router.get("/navigate/:id/explore", function (req, res) {
  var id = req.params.id
  console.log(id)
  res.json({ redirect: "/explore/" + id })
})

router.get("/navigate/:id/favorites", function (req, res) {
  var id = req.params.id
  console.log(id)
  res.json({ redirect: "/favorites/" + id })
})

//Nav Bar Routing
router.get("/search/:id/nav/explore", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/explore/" + id })
})
router.get("/search/:id/nav/favorites", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/favorites/" + id })
})
router.get("/search/:id/nav/login", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/" })
})
router.get("/explore/:id/nav/search", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/search/" + id })
})
router.get("/explore/:id/nav/favorites", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/favorites/" + id })
})
router.get("/explore/:id/nav/login", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/" })
})
router.get("/favorites/:id/nav/search", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/search/" + id })
})
router.get("/favorites/:id/nav/explore", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/explore/" + id })
})
router.get("/favorites/:id/nav/login", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/" })
})
router.get("/search/:id/:muscle/nav/explore", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/explore/" + id })
})
router.get("/search/:id/:muscle/nav/favorites", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/favorites/" + id })
})
router.get("/search/:id/:muscle/nav/login", function (req, res) {
  var id = req.params.id
  res.json({ redirect: "/" })
})

//To save exercicese from search page
router.post("/search/:id/:muscle/savesearch", function (req, res) {
  var id = req.params.id;
  var searchToSave = req.body.exerciseToSave;
  var condition = "password='" + id + "'";

  workout.verifyUser(condition, function (result) {
    var tablename = result[0].username
    console.log("tablename: " + tablename)
    console.log("lenght of user table check: " + result.length)
    if(result.length === 1) {
      var condition2 = "name = '" + searchToSave + "'";
      workout.selectExerciseWhere(condition2, function(result2) {
        var searchid = result2[0].id
        console.log("searchid = " + searchid)

        if(result2) {
          var condition3 = "refID = '" + searchid + "'";
          workout.verifySaved(tablename, condition3, function(response) {
            if(response.length === 0) {
              console.log("lenght of exercise in table check: " + response.length)
              workout.addFavToUserTable(tablename, ["exercises", searchid], function(data) {
                if(data) {
                  console.log("added to table")
                }
              })
            }
            else(
              console.log("this workout already exists in this user's table")
            )
          })
        }
      })

    }
  })


})

module.exports = router;