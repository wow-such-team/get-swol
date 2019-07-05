$(function() {
    $(".dropdown-item").on('click', function(event) {
        event.preventDefault();
        $("#search-save").empty();
        var searchedExercise = {
            exerciseSearch: $(this).text().trim()
        }
        console.log(searchedExercise);

        $.ajax(window.location.pathname, {
            type: "POST",
            data: searchedExercise
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    });

    //Nav Bar Functionality
    $("#home-page").on("click", function(event) {
        event.preventDefault();
        $.ajax(window.location.pathname + "/nav/search", {
            type: "GET"
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    })
    $("#workouts-page").on("click", function(event) {
        event.preventDefault();
        $.ajax(window.location.pathname + "/nav/explore", {
            type: "GET"
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    })
    $("#exercises-page").on("click", function(event) {
        event.preventDefault();
        $.ajax(window.location.pathname + "/nav/favorites", {
            type: "GET"
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    })
    $("#login-page").on("click", function(event) {
        event.preventDefault();
        $.ajax(window.location.pathname + "/nav/login", {
            type: "GET"
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    })

    //Save Exercise
    $(".favorite-button").on("click", function(event){
        event.preventDefault();
        var saveThis = {
            exerciseToSave: $(this).siblings("p")[0].innerText
        }
        console.log(saveThis);

        $.ajax(window.location.pathname + "/savesearch", {
            type: "POST",
            data: saveThis
        }).then(
            function(response){
                window.location = response.redirect;
            }
        )
    })

})
