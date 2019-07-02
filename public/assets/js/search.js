$(function() {
    $(".dropdown-item").on('click', function(event) {
        event.preventDefault();
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