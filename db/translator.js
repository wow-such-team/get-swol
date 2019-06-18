var fs = require("fs");
var connection = require("../config/connection.js")
// Set up MySQL connection.
var exerciseData;

fs.readFile("data.txt", "utf8", function(error, data) {
    if(error) throw error;

    exerciseData = data.split("\n").join(",").split(",");

    console.log(exerciseData);

    for(var i=0; i<exerciseData.length; i+=2) {
        connection.query("INSERT INTO exercises SET ?", {
            name: exerciseData[i],
            muscles: exerciseData[i+1]
        },
        function(err, response) {
            if(err) throw err;

            console.log(response.affectedRows + " product inserted!\n");
        });
    };

    connection.query("SELECT * FROM exercises", function (error, response) {
        if(error) throw error;

        console.log(response);
    });
});