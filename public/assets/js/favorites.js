$(document).ready(function () {

    console.log("favorites.js working");

    // var savedWODiv = $('<th scope="col"> ❤' + savedWO+ '</th>');

    var savedWODiv = $("#savedWOitems")

    // assignes unique href to each premade workout to allow for dropdown function
    // $(".favPremade").on("click", function() {
    //     $(this).attr({href: "#" + $(this).attr('value')});
    //     console.log($(this).attr('value'));
    //     console.log($(this).attr('href'));
    // });

    $("#sunday_btn").on("click", function () {
        $("#sunday_data").append(savedWODiv)
    });


    $("#monday_btn").on("click", function () {
        $("#monday_data").append(savedWODiv)
    });


    $("#tuesday_btn").on("click", function () {
        $("#tuesday_data").append(savedWODiv)
    });

    $("#wednesday_btn").on("click", function () {
        $("#wednesday_data").append(savedWODiv)
    });

    $("#thursday_btn").on("click", function () {
        $("#thursday_data").append(savedWODiv)
    });

    $("#friday_btn").on("click", function () {
        $("#friday_data").append(savedWODiv)
    });

    $("#saturday_btn").on("click", function () {
        $("#saturday_data").append(savedWODiv)
    });



});
