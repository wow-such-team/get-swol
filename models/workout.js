// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var workout = {
  resultsArr: [],
  clearResults: function() {
    this.resultsArr = [];
  },
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
  allPremadeWO: function(cb) {
    orm.all("premadeWO", function(res) {
      cb(res);
    });
  },
  selectExerciseWhere: function(condition, cb) {
    orm.selectWhere("exercises", condition, function(res) {
      cb(res);
    });
  },
  selectPremadeWoWhere: function(condition, cb) {
    orm.selectWhere("premadeWO", condition, function(res) {
      cb(res);
    });
  },
  selectExerciseWhereIn: function(column, conditionArr, cb) {
    orm.selectWhereIn("exercises", column, conditionArr, function(res) {
      cb(res);
    });
  },
  selectPremadeWOWhereIn: function(column, conditionArr, cb) {
    orm.selectWhereIn("premadeWO", column, conditionArr, function(res) {
      cb(res);
    });
  },
  createUserTable: function(tableName, cb) {
    var listOfColumns = "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ";
    listOfColumns += 'refTable ENUM("premadeWO", "exercises") NOT NULL, ';
    listOfColumns += 'refID INT NOT NULL, ';
    listOfColumns += 'assignedDay VARCHAR(255)';

    console.log(listOfColumns);
    
    orm.createTable(tableName, listOfColumns, function(res) {
      cb(res);
    });
  },
  allUserFavs: function(hashpw, cb) {
    var condition = 'password = "' + hashpw + '"';

    this.verifyUser(condition, function(res) {
      var username = res[0].username;
      console.log(username);

      orm.all(username, function(result) {
        cb(result);
      });
    });
  },
  addFavToUserTable: function(userHash, vals, cb) {
    var columns = ["refTable", "refID"];
    orm.create(userHash, columns, vals, function(res) {
      cb(Res);
    });
  },
  // for deleting an associated day from a saved favorite in the user's table
  updateFavInUserTable: function(userHash, dayOfWeek, condition, cb) {
    var updatedInfo = {"dayOfWeek": dayOfWeek};
    orm.update(userHash, updatedInfo, condition, function(res) {
      cb(res);
    });
  },
  deleteFavInUserTable: function(userHash, savedID, cb) {
    var condition = "id = " + savedID;

    orm.delete(userHash, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (swolController.js).
module.exports = workout;