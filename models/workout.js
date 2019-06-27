// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var workout = {
  allUser: function(cb) {
    orm.all("users", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  createUser: function(cols, vals, cb) {
    orm.create("users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateUser: function(objColVals, condition, cb) {
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteUser: function(condition, cb) {
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  },
  verifyUser: function(condition, cb) {
    orm.selectWhere("users", condition, function(res) {
      cb(res);
    });
  },
  allExercises: function(cb) {
    orm.all("exercises", function(res) {
      cb(res);
    });
  },
  selectExerciseWhere: function(condition, cb) {
    orm.selectWhere("exercises", condition, function(res) {
      cb(res);
    });
  },
  joinPremadeToWOById: function(woId, cb) {

    orm.selectWhere("premadeWO", "id = '" + woId + "'", function(res) {
      exercisesIdArr = res[0].exerciseList.split(",");
      exercisesArr = [];

      for(var i=0; i<exercisesIdArr.length; i++) {
        exercisesIdArr[i] = parseInt(exercisesIdArr[i].trim());
        
        workout.selectExerciseWhere("id = '" + exercisesIdArr[i] + "'", function(result) {
          exercisesArr.push(result[0]);
          console.log(result);
        });
      };
      
      cb(exercisesArr);
    });
  }
};

workout.joinPremadeToWOById(3, function(res) {
  console.log(res);
});

// Export the database functions for the controller (swolController.js).
module.exports = workout;