console.log("Navigate.js is working")

$(function() {
    $("#search-link").on("click", function(event) {
        event.preventDefault();
        var pathname = window.location.pathname;
        console.log(pathname);
        $.ajax(pathname + "/search", {
            type: "GET",
        }).then(
            function(response){
                window.location = response.redirect
            }
        )
    });
    $("#explore-link").on("click", function(event) {
        event.preventDefault();
        var pathname = window.location.pathname;
        console.log(pathname);
        $.ajax(pathname + "/explore", {
            type: "GET",
        }).then(
            function(response){
                window.location = response.redirect
            }
        )
    });
})