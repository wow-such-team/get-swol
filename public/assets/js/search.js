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
})