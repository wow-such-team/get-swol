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

})
