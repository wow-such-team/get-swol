console.log("favorites.js working");

//  // dynamically create html elements
//  var userNameDiv = $("<td>", {class:"username", text: childSnapshot.val().name});
//  var recSaveDiv = $("<td>", {class: "saverecipe", text: "Save Recipe"});
 
//  // Employee Info
//  console.log(userNameDiv.text());
//  console.log(recSaveDiv.text());

//  // Create the new row
//  var newRow = $("<tr>").append(
//      userNameDiv,
//      recSaveDiv
//  );

//  // give row attribute to be later referenced
//  newRow.attr("name", userNameDiv.text());

//  // Append the new row to the table
//  $("#user-table > tbody").append(newRow);

    // when click date, show user's favorites 
    $("#button1").on("click", function() {
        console.log("clicked save");
        // console.log($(this).text());
        
        // // if clicked item text is the same as name value of data
        // if($(this).text()===childSnapshot.val().name) {
        //     console.log("it worked");

        //     console.log(childSnapshot.val().name);

        //     // clear previously displayed recipes
        //     $("#recipe-table-body").html("");

        //     // update title of box to show which user's favorites are being displayed
        //     $("#user-favorites-title").text("Favorite Recipes for " + childSnapshot.val().name);

        //     // get user's favorite recipes from firebase
        //     database.ref('users').child(childSnapshot.key).child('recipes').on('child_added', function(childSnapshot) {
        //         console.log(childSnapshot.val());

        //         // dynamically create elements w/ text to display recipe title & url
        //         var favRecipeTitle = $("<td>", {text: childSnapshot.val().label});
        //         var favRecipeLink = $("<a>", {href: childSnapshot.val().url, text: childSnapshot.val().url});
        //         var linkDiv = $("<td>").append(favRecipeLink);
            
        //         var newRecipeRow = $("<tr>").append(favRecipeTitle, linkDiv);

        //         $("#recipe-table > tbody").append(newRecipeRow);;
        //     });
        // };
    });

